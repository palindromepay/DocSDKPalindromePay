---
title: submitArbiterDecision
description: "Palindrome Crypto Pay: Arbiter resolves the dispute with a final ruling. Funds go to seller (COMPLETE) or buyer (REFUNDED)."
---

```ts
async submitArbiterDecision(
  walletClient: WalletClient,
  escrowId: bigint,
  resolution: DisputeResolution,
  ipfsHash: string
): Promise<Hex>
```

**Only the designated arbiter** (or platform admin) can call this function.

This is the **final step** in a dispute — it permanently resolves the escrow and releases funds immediately.

#### Parameters
- `walletClient: WalletClient` – Arbiter’s connected wallet
- `escrowId: bigint` – The disputed escrow ID
- `resolution: DisputeResolution` – Use `DisputeResolution.Complete` (seller wins) or `DisputeResolution.Refunded` (buyer wins)
- `ipfsHash: string` – IPFS CID of the final ruling + explanation

#### Returns
`Promise<Hex>` – Transaction hash

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { DisputeResolution } from '@palindromepay/sdk';

const { sdk, walletClient: arbiterWallet } = await connectAndInitSDK();

try {
  const txHash = await sdk.submitArbiterDecision(
    arbiterWallet,
    42n,
    DisputeResolution.Complete,     // seller wins
    "QmFinalRuling123...explanation-hash"
  );

  console.log("Dispute resolved — seller wins!");
  console.log("Funds released (minus 1% fee)");
  console.log("Transaction:", txHash);

  // Escrow state → COMPLETE
  // Seller can now withdraw

} catch (error: any) {
  if (error.code === "NOT_ARBITER") {
    alert("Only the arbiter can resolve this dispute");
  } else if (error.code === "INVALID_STATE") {
    alert("Escrow is not in DISPUTED state");
  } else {
    console.error("Arbiter decision failed:", error.shortMessage || error.message);
  }
}
```

#### Outcomes

| Resolution                     | Funds Go To       | Fee Deducted? | Final State   |
|--------------------------------|-------------------|---------------|---------------|
| `DisputeResolution.Complete`   | Seller            | Yes (1%)      | `COMPLETE`    |
| `DisputeResolution.Refunded`   | Buyer (full)      | No            | `REFUNDED`    |

If the escrow has an `arbiterFeeBps` set (see [`createEscrow()`](/docs/create-escrow)), the arbiter's fee is paid out when they resolve the dispute.

#### Best Practice for Arbiter Ruling (IPFS)
Upload a clear JSON:
```json
{
  "ruling": "Seller wins",
  "winner": "seller",
  "reason": "Tracking shows item delivered on time. Buyer did not respond to messages.",
  "evidenceReviewed": ["QmBuyer...", "QmSeller..."],
  "timestamp": "2025-04-05T12:00:00Z"
}
```

**See also** → [`submitDisputeMessage()`](/docs/submit-dispute-message) · [`refundAfterDisputeTimeout()`](/docs/refund-after-dispute-timeout) · [`getDisputeSubmissionStatus()`](/docs/get-dispute-submission-status)

