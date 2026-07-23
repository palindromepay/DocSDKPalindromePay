---
title: startDispute
description: "Palindrome Crypto Pay: Open a dispute if the deal went wrong. This moves the escrow to DISPUTED state for arbiter resolution."
---

```ts
async startDispute(walletClient: WalletClient, escrowId: bigint): Promise<Hex>
```

**Called by buyer or seller** when something goes wrong:
- Seller never delivered
- Item not as described
- Buyer claims non-delivery
- Any disagreement after deposit

Calling this:
- Pauses the escrow
- Moves state to `DISPUTED`
- Opens the dispute resolution phase
- Arbiter (if set) or platform will decide winner

#### Parameters
- `walletClient: WalletClient` – Buyer or seller wallet
- `escrowId: bigint`

#### Returns
`Promise<Hex>` – Transaction hash

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

try {
  const txHash = await sdk.startDispute(walletClient, 42n);

  console.log("Dispute opened successfully!");
  console.log("Arbiter will now review evidence");
  console.log("Transaction:", txHash);

  // Escrow state → DISPUTED
  // Next: both parties submit evidence via submitDisputeMessage()

} catch (error: any) {
  if (error.code === "INVALID_STATE") {
    alert("Cannot dispute — escrow not in valid state (must be AWAITING_DELIVERY or similar)");
  } else if (error.message.includes("Dispute already started")) {
    alert("Dispute already in progress");
  } else {
    console.error("Failed to start dispute:", error.shortMessage || error.message);
  }
}
```