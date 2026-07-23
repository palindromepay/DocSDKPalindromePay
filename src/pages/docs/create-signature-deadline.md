---
title: createSignatureDeadline
description: "Palindrome Crypto Pay: Create a signature expiration deadline based on current block timestamp for secure gasless transactions."
---

```ts
async createSignatureDeadline(minutesFromNow: number = 10): Promise<bigint>
```

Creates a deadline timestamp for EIP-712 signatures. Uses the current block timestamp (not local time) to ensure accuracy across different time zones and client clocks.

#### Parameters
- `minutesFromNow: number` – Minutes until signature expires (default: 10)

#### Returns
`Promise<bigint>` – Unix timestamp when signature expires

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Default: 10 minutes from now
const deadline10 = await sdk.createSignatureDeadline();
console.log("Expires in 10 min:", new Date(Number(deadline10) * 1000));

// Custom: 60 minutes (1 hour)
const deadline60 = await sdk.createSignatureDeadline(60);
console.log("Expires in 1 hour:", new Date(Number(deadline60) * 1000));

// Short: 5 minutes for quick operations
const deadline5 = await sdk.createSignatureDeadline(5);
console.log("Expires in 5 min:", new Date(Number(deadline5) * 1000));
```

#### Why Block Timestamp?

The deadline is calculated from the **blockchain's block timestamp**, not your local clock:

```ts
const block = await publicClient.getBlock();
const deadline = block.timestamp + (minutesFromNow * 60);
```

This ensures:
- Consistent expiration across all users
- No clock drift issues
- Contract validation works correctly

#### Usage with Signatures

```ts
// Create deadline
const deadline = await sdk.createSignatureDeadline(60);

// Get nonce
const nonce = await sdk.getUserNonce(escrowId, userAddress);

// Sign with deadline
const signature = await sdk.signConfirmDelivery(
  walletClient,
  escrowId,
  deadline,
  nonce
);

// Check if still valid before submitting
if (!sdk.isSignatureDeadlineExpired(deadline)) {
  await sdk.confirmDeliverySigned(...);
}
```

#### Recommended Deadlines

| Operation | Recommended | Why |
|-----------|-------------|-----|
| Confirm Delivery | 60 min | Gives user time to review |
| Start Dispute | 60 min | Important action, needs time |
| Request Cancel | 30 min | Simpler operation |
| Quick operations | 10 min | Default, secure |

**See also** → [`isSignatureDeadlineExpired()`](/docs/is-signature-deadline-expired) · [`getUserNonce()`](/docs/get-user-nonce)
