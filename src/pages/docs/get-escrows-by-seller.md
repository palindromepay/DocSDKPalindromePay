---
title: getEscrowsBySeller
description: "Palindrome Crypto Pay: Fetch all escrows where the specified address is the seller. Query your sales history from the blockchain."
---

```ts
async getEscrowsBySeller(seller: string): Promise<Escrow[]>
```

Queries the subgraph to retrieve all escrows where the given address is the **seller**.

#### Parameters
- `seller: string` – The seller's wallet address

#### Returns
`Promise<Escrow[]>` – Array of escrow objects

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const escrows = await sdk.getEscrowsBySeller("0xSellerAddress...");

console.log(`Found ${escrows.length} escrows as seller`);

escrows.forEach(escrow => {
  console.log(`Escrow #${escrow.id}: ${escrow.state}`);
  console.log(`  Buyer: ${escrow.buyer}`);
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
- Display seller's sales history
- Show pending payments awaiting delivery confirmation
- Track all active orders for a seller dashboard
