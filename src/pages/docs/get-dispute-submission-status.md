---
title: getDisputeSubmissionStatus
description: "Palindrome Crypto Pay: Get evidence submission status for buyer, seller, and arbiter in one call. Track dispute progress."
---

```ts
async getDisputeSubmissionStatus(escrowId: bigint): Promise<DisputeSubmissionStatus>
```

Returns a complete overview of who has (and hasn’t) submitted evidence in a disputed escrow.

Perfect for showing progress bars, status indicators, or “Waiting for X” messages.

#### Parameters
- `escrowId: bigint` – The disputed escrow ID

#### Returns
`Promise<DisputeSubmissionStatus>` – Object with boolean flags and helper

```ts
interface DisputeSubmissionStatus {
  buyer: boolean;
  seller: boolean;
  arbiter: boolean;
  allSubmitted: boolean;   // true if all three have submitted
}
```

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

try {
  const status = await sdk.getDisputeSubmissionStatus(42n);

  console.log("Dispute evidence status:", {
    buyer: status.buyer ? "Submitted" : "Pending",
    seller: status.seller ? "Submitted" : "Pending",
    arbiter: status.arbiter ? "Submitted" : "Pending",
    complete: status.allSubmitted ? "All evidence in — arbiter can rule" : "Still waiting",
  });

  // Example UI logic
  if (status.allSubmitted) {
    alert("All parties have submitted — arbiter will decide soon!");
  } else if (!status.buyer) {
    alert("You haven't submitted your evidence yet!");
  }

} catch (error) {
  console.error("Failed to fetch dispute status:", error);
}
```

#### Sample Output

```ts
{
  buyer: true,
  seller: true,
  arbiter: false,
  allSubmitted: false
}
→ "Waiting for arbiter to submit final ruling"
```

**See also** → [`hasSubmittedEvidence()`](/docs/has-submitted-evidence) for single checks
