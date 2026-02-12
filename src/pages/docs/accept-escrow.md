---
title: acceptEscrow
description: "Palindrome Crypto Pay: Seller accepts a buyer-created escrow and provides wallet authorization signature for the 2-of-3 multisig."
---

```ts
async acceptEscrow(walletClient: WalletClient, escrowId: bigint): Promise<{ txHash: Hex; signatureValid: boolean }>
```

**Called by the seller** when the buyer created the escrow via `createEscrowAndDeposit()`. The seller must accept to provide their wallet authorization signature, which is required for the 2-of-3 multisig withdrawal mechanism.

Without accepting, the seller cannot receive funds even if the buyer confirms delivery.

#### Parameters
- `walletClient: WalletClient` – Seller's connected wallet
- `escrowId: bigint` – The escrow ID to accept

#### Returns
`Promise<{ txHash: Hex; signatureValid: boolean }>` – Transaction hash and signature verification result

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = seller

try {
  const { txHash, signatureValid } = await sdk.acceptEscrow(walletClient, 42n);

  console.log("Escrow accepted!");
  console.log("You can now receive funds when buyer confirms delivery");
  console.log("Transaction:", txHash);
  console.log("Signature valid:", signatureValid);

  // Your wallet signature is now registered
  // When buyer confirms, funds will be released to you

} catch (error: any) {
  if (error.code === "NOT_SELLER") {
    alert("Only the seller can accept this escrow");
  } else if (error.code === "INVALID_STATE") {
    alert("Escrow is not in AWAITING_DELIVERY state");
  } else if (error.code === "ALREADY_ACCEPTED") {
    alert("You have already accepted this escrow");
  } else {
    console.error("Accept failed:", error.shortMessage || error.message);
  }
}
```

#### When to Use

This function is required when:
- The **buyer** created the escrow using `createEscrowAndDeposit()`
- The escrow is in `AWAITING_DELIVERY` state
- You (seller) have not yet provided your wallet signature

#### Flow Diagram

| Step | Action | Who |
|------|--------|-----|
| 1 | Buyer creates escrow + deposits | Buyer |
| 2 | **Seller accepts escrow** | Seller |
| 3 | Seller delivers product/service | Seller |
| 4 | Buyer confirms delivery | Buyer |
| 5 | Funds released to seller | Automatic |

**See also** → [`createEscrowAndDeposit()`](/docs/create-escrow-and-deposit) · [`confirmDelivery()`](/docs/confirm-delivery)
