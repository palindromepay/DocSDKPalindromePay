---
title: confirmDeliverySigned
description: Gasless delivery confirmation — buyer signs off-chain, anyone can submit
---

```ts
async confirmDeliverySigned(walletClient: WalletClient, escrowId: bigint): Promise<string>
```

**Gasless version** of `confirmDelivery()` — the buyer signs a message off-chain (no gas), and **anyone** (you, a relayer, or the seller) can submit the signature on-chain to release funds.

Perfect for mobile users, dApp UX, or reducing buyer friction.

#### How It Works
1. Buyer signs a message with a 60-minute deadline
2. Signature + deadline + nonce sent to contract
3. Contract verifies signature and releases funds exactly like normal `confirmDelivery`

#### Parameters
- `walletClient: WalletClient` – Buyer’s wallet (only used for signing)
- `escrowId: bigint`

#### Returns
`Promise<string>` – Transaction hash (from whoever submits)

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer

try {
  // Buyer signs (no gas!)
  const txHash = await sdk.confirmDeliverySigned(walletClient, 42n);

  console.log("Signed & submitted successfully!");
  console.log("Delivery confirmed — funds released to seller");
  console.log("Tx:", txHash);

  // Works exactly like regular confirmDelivery
  // State → COMPLETE

} catch (error: any) {
  if (error.code === "NOT_BUYER") {
    alert("Only the buyer can sign this");
  } else if (error.code === "SIGNATURE_EXPIRED") {
    alert("Signature deadline passed — please try again");
  } else {
    console.error("Gasless confirm failed:", error.shortMessage || error.message);
  }
}
```