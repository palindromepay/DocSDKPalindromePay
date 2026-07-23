---
title: getEscrowDetail
description: "Palindrome Crypto Pay: Fetch detailed escrow data from the subgraph including all related information and dispute history."
---

```ts
async getEscrowDetail(escrowId: string): Promise<EscrowDetail | null>
```

Queries the subgraph to retrieve comprehensive details about a specific escrow, including dispute messages.

#### Parameters
- `escrowId: string` – The escrow ID to fetch

#### Returns
`Promise<EscrowDetail | null>` – Detailed escrow object or null if not found

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const detail = await sdk.getEscrowDetail("42");

if (detail) {
  console.log(`Escrow #${detail.id}`);
  console.log(`  Buyer: ${detail.buyer}`);
  console.log(`  Seller: ${detail.seller}`);
  console.log(`  Amount: ${detail.amount}`);
  console.log(`  State: ${detail.state}`);
  console.log(`  Created: ${detail.createdAt}`);

  if (detail.disputeMessages?.length) {
    console.log(`  Dispute messages: ${detail.disputeMessages.length}`);
  }
} else {
  console.log("Escrow not found");
}
```

#### Use Cases
- Display full escrow details page
- Review dispute history and evidence

#### Related Methods
- [`getEscrowById()`](/docs/get-escrow-by-id) – Get raw on-chain data
- [`getEscrowByIdParsed()`](/docs/get-escrow-by-id-parsed) – Get parsed on-chain data
- [`getDisputeMessages()`](/docs/get-dispute-messages) – Get dispute messages only
