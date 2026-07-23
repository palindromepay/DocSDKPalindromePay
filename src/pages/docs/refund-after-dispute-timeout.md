---
title: refundAfterDisputeTimeout
description: "Palindrome Crypto Pay: Buyer claims a full refund when the arbiter fails to resolve a dispute within 30 days."
---

```ts
async refundAfterDisputeTimeout(
  walletClient: WalletClient,
  escrowId: bigint
): Promise<Hex>
```

If a dispute has been open for longer than **30 days plus a 1-hour buffer** without an arbiter decision, the **buyer** can unilaterally claim a full refund. The SDK signs a `REFUNDED` payout authorization on the buyer's behalf; since the buyer is the sole beneficiary, a single signature is sufficient.

#### Parameters
- `walletClient: WalletClient` – Buyer's connected wallet
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<Hex>` – Transaction hash

#### Requirements
- Caller must be the **buyer**
- Escrow must be in `DISPUTED` state
- At least `disputeStartTime + 30 days + 1 hour` must have passed

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // buyer

try {
  const txHash = await sdk.refundAfterDisputeTimeout(walletClient, 42n);

  console.log("Refund claimed!");
  console.log("Tx:", txHash);
  // State → REFUNDED, funds returned to buyer

} catch (error: any) {
  if (error.code === "NOT_BUYER") {
    alert("Only the buyer can claim this refund");
  } else if (error.code === "INVALID_STATE") {
    // Either not DISPUTED, or the timeout has not elapsed yet.
    // error.details.refundableAt contains the unix timestamp from
    // which the refund becomes available.
    console.warn("Refund not available yet:", error.message);
  } else {
    console.error("Refund failed:", error.shortMessage || error.message);
  }
}
```

#### Checking availability upfront

```ts
const escrow = await sdk.getEscrowByIdParsed(42n);

const THIRTY_DAYS = 30n * 24n * 60n * 60n;
const BUFFER = 60n * 60n; // 1 hour
const refundableAt = escrow.disputeStartTime + THIRTY_DAYS + BUFFER;

const now = BigInt(Math.floor(Date.now() / 1000));
if (escrow.state === 2 /* DISPUTED */ && now >= refundableAt) {
  console.log("Refund is available now");
} else {
  console.log("Refundable at:", new Date(Number(refundableAt) * 1000));
}
```

**See also** → [`startDispute()`](/docs/start-dispute) · [`submitArbiterDecision()`](/docs/submit-arbiter-decision) · [`signWalletAuthorization()`](/docs/sign-wallet-authorization)
