---
title: isSignatureDeadlineExpired
description: "Palindrome Crypto Pay: Check if a signature deadline has passed. Validate signatures before submitting gasless transactions."
---

```ts
isSignatureDeadlineExpired(deadline: bigint, safetySeconds: number = 5): boolean
```

Checks whether a signature deadline has expired. Includes a safety buffer to avoid submitting signatures that might expire during transaction confirmation.

#### Parameters
- `deadline: bigint` – The deadline timestamp to check
- `safetySeconds: number` – Safety buffer in seconds (default: 5)

#### Returns
`boolean` – `true` if deadline has passed (signature invalid), `false` if still valid

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Create a deadline
const deadline = await sdk.createSignatureDeadline(10); // 10 minutes

// Check immediately — should be valid
console.log(sdk.isSignatureDeadlineExpired(deadline)); // false

// Wait... then check again
setTimeout(() => {
  console.log(sdk.isSignatureDeadlineExpired(deadline)); // true (after 10+ min)
}, 11 * 60 * 1000);
```

#### Safety Buffer

The `safetySeconds` parameter adds a buffer to prevent edge cases:

```ts
// Default: 5 second buffer
sdk.isSignatureDeadlineExpired(deadline); // Expires 5s before actual deadline

// Custom: 30 second buffer for slow networks
sdk.isSignatureDeadlineExpired(deadline, 30);

// No buffer (risky!)
sdk.isSignatureDeadlineExpired(deadline, 0);
```

#### Usage Pattern

```ts
async function submitWithRetry(escrowId: bigint, deadline: bigint, signature: Hex) {
  // Always check before submitting
  if (sdk.isSignatureDeadlineExpired(deadline)) {
    throw new Error("Signature expired — please sign again");
  }

  try {
    return await sdk.confirmDeliverySigned(...);
  } catch (error) {
    // If failed due to deadline, inform user
    if (sdk.isSignatureDeadlineExpired(deadline)) {
      throw new Error("Signature expired during submission");
    }
    throw error;
  }
}
```

#### UI Example

```tsx
function SignatureStatus({ deadline }: { deadline: bigint }) {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const check = () => setExpired(sdk.isSignatureDeadlineExpired(deadline));
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return expired ? (
    <span className="text-red-500">Signature expired</span>
  ) : (
    <span className="text-green-500">Signature valid</span>
  );
}
```

**See also** → [`createSignatureDeadline()`](/docs/create-signature-deadline) · [`signConfirmDelivery()`](/docs/sign-confirm-delivery)
