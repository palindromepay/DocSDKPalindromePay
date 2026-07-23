---
title: cancelByTimeout
description: "Palindrome Crypto Pay: Finalize cancellation after maturity time passed and buyer requested cancel. Returns funds to buyer."
---

```ts
async cancelByTimeout(walletClient: WalletClient, escrowId: bigint): Promise<Hex>
```

**Anyone** can call this function once:
- Both buyer and seller have called `requestCancel()` (or `requestCancelSigned`)
- The 24-hour timeout has passed

This immediately:
- Sets escrow state to `CANCELED`
- Returns **full funds** to the buyer (no fees!)
- Ends the deal cleanly

#### Parameters
- `walletClient: WalletClient` – Any wallet (you, a relayer, or even a bot)
- `escrowId: bigint`

#### Returns
`Promise<Hex>` – Transaction hash

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // any wallet works

try {
  const txHash = await sdk.cancelByTimeout(walletClient, 42n);

  console.log("Escrow successfully canceled by timeout!");
  console.log("Full refund sent to buyer");
  console.log("Transaction:", txHash);

  // State → CANCELED
  // Buyer can now call withdraw() to claim funds

} catch (error: any) {
  if (error.message.includes("Both parties have not requested cancel")) {
    alert("Both parties must request cancel first");
  } else if (error.message.includes("Timeout period not elapsed")) {
    alert("24-hour timeout not passed yet");
  } else {
    console.error("Cancel by timeout failed:", error.shortMessage || error.message);
  }
}
```

#### Full Mutual Cancellation Flow

| Step                        | Action                                   | Who Pays Gas |
|----------------------------|------------------------------------------|--------------|
| 1                          | `requestCancel()` or `requestCancelSigned()` (buyer) | Buyer or free |
| 2                          | `requestCancel()` or `requestCancelSigned()` (seller) | Seller or free |
| 3                          | Wait ~24 hours                           | —            |
| 4                          | `cancelByTimeout()` (anyone)             | Anyone (can be you or bot) |
