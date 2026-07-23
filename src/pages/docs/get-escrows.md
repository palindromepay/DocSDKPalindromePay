---
title: getEscrows
description: "Palindrome Crypto Pay: Fetch all escrows from the subgraph. Query the complete list of escrow deals on the blockchain."
---

```ts
async getEscrows(): Promise<Escrow[]>
```

Queries the subgraph to retrieve **all escrows** in the system.

#### Parameters
None

#### Returns
`Promise<Escrow[]>` – Array of all escrow objects

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const allEscrows = await sdk.getEscrows();

console.log(`Total escrows: ${allEscrows.length}`);

allEscrows.forEach(escrow => {
  console.log(`Escrow #${escrow.id}`);
  console.log(`  Buyer: ${escrow.buyer}`);
  console.log(`  Seller: ${escrow.seller}`);
  console.log(`  State: ${escrow.state}`);
  console.log(`  Amount: ${escrow.amount}`);
});
```

#### Escrow Object Structure
```ts
interface Escrow {
  id: string;
  buyer: string;
  seller: string;
  amount: string;
  token: string;
  state: string;
  arbiter?: string;
  createdAt: string;
  // ... additional fields from subgraph
}
```

#### Use Cases
- Admin dashboard showing all platform escrows
- Analytics and reporting
- Platform-wide statistics

#### Related Methods
- [`getEscrowsByBuyer()`](/docs/get-escrows-by-buyer) – Filter by buyer address
- [`getEscrowsBySeller()`](/docs/get-escrows-by-seller) – Filter by seller address
- [`getEscrowById()`](/docs/get-escrow-by-id) – Fetch a single escrow
