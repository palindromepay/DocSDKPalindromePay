---
title: getDisputeMessages
description: "Palindrome Crypto Pay: Fetch all dispute messages and evidence for an escrow from the subgraph. Review the full dispute history."
---

```ts
async getDisputeMessages(escrowId: string): Promise<DisputeMessage[]>
```

Queries the subgraph to retrieve all dispute messages and evidence submissions for a specific escrow.

#### Parameters
- `escrowId: string` – The escrow ID to fetch messages for

#### Returns
`Promise<DisputeMessage[]>` – Array of dispute message objects

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const messages = await sdk.getDisputeMessages("42");

console.log(`Found ${messages.length} dispute messages`);

messages.forEach(msg => {
  console.log(`From: ${msg.sender} (${msg.role})`);
  console.log(`IPFS: ${msg.ipfsHash}`);
  console.log(`Submitted: ${msg.timestamp}`);
});
```

#### DisputeMessage Structure
```ts
interface DisputeMessage {
  id: string;
  escrowId: string;
  sender: string;
  role: string; // "buyer" | "seller" | "arbiter"
  ipfsHash: string;
  timestamp: string;
}
```

#### Use Cases
- Display dispute timeline with all evidence
- Arbiter review panel
- Audit dispute resolution process

#### Related Methods
- [`submitDisputeMessage()`](/docs/submit-dispute-message) – Submit new evidence
- [`getEscrowDetail()`](/docs/get-escrow-detail) – Get full escrow details including messages
