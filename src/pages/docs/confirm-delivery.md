---
title: confirmDelivery
description: Buyer confirms successful delivery — releases funds to the seller
---

```ts
async confirmDelivery(walletClient: WalletClient, escrowId: bigint): Promise<string>
```

**Called by the buyer** after receiving the product/service in good condition.

This instantly releases the escrowed funds (minus fee) to the seller and marks the deal as **COMPLETE**.

#### Parameters
- `walletClient: WalletClient` – Buyer's connected wallet
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<string>` – Transaction hash

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer

try {
  const txHash = await sdk.confirmDelivery(walletClient, 42n);

  console.log("Delivery confirmed — thank you!");
  console.log("Funds released to seller");
  console.log("Transaction:", txHash);

  // Escrow state → COMPLETE
  // Seller can now withdraw their funds

} catch (error: any) {
  if (error.code === "NOT_BUYER") {
    alert("Only the buyer can confirm delivery");
  } else if (error.code === "INVALID_STATE") {
    alert("Escrow is not awaiting delivery");
  } else {
    console.error("Confirmation failed:", error.shortMessage || error.message);
  }
}
```