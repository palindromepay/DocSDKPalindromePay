---
title: getNextEscrowId
description: "Palindrome Crypto Pay: Get the next escrow ID that will be assigned. Useful for predicting wallet addresses before creation."
---

```ts
async getNextEscrowId(): Promise<bigint>
```

Reads the `nextEscrowId` counter from the contract. This is the ID that will be assigned to the next escrow created.

#### Parameters
None

#### Returns
`Promise<bigint>` – The next escrow ID

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromepay/sdk';

const { sdk } = await connectAndInitSDK();

const nextId = await sdk.getNextEscrowId();
console.log("Next escrow will be ID:", nextId);

// If nextId is 42n, the next escrow created will have ID 42
// After creation, nextEscrowId becomes 43
```

#### Common Use Cases

**1. Predict wallet address before creation:**
```ts
const nextId = await sdk.getNextEscrowId();
const walletAddress = await sdk.predictWalletAddress(nextId);
console.log("Future escrow wallet:", walletAddress);
```

**2. Pre-sign authorizations:**
```ts
const nextId = await sdk.getNextEscrowId();
const predictedWallet = await sdk.predictWalletAddress(nextId);
const sig = await sdk.signWalletAuthorization(walletClient, predictedWallet, nextId, EscrowState.COMPLETE);
```

**3. Track total escrows created:**
```ts
const nextId = await sdk.getNextEscrowId();
const totalEscrows = Number(nextId); // IDs start at 0, so nextId = total count
console.log("Total escrows created:", totalEscrows);
```

**4. Display in UI:**
```ts
function EscrowStats() {
  const [totalEscrows, setTotalEscrows] = useState(0);

  useEffect(() => {
    sdk.getNextEscrowId().then(id => setTotalEscrows(Number(id)));
  }, []);

  return <div>Total Escrows: {totalEscrows}</div>;
}
```

#### Race Condition Warning

If multiple users create escrows simultaneously, the predicted ID might change:

```ts
// User A gets nextId = 42
const nextIdA = await sdk.getNextEscrowId();

// User B creates escrow → nextId becomes 43
await sdkB.createEscrow(...);

// User A's prediction is now wrong!
// The escrow they create will be ID 43, not 42
```

The SDK handles this internally by checking the event logs after creation, but be aware of this when building custom flows.

**See also** → [`predictWalletAddress()`](/docs/predict-wallet-address) · [`createEscrow()`](/docs/create-escrow)
