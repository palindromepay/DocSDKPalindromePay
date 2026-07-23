---
title: getEscrowsByBuyer
description: "Palindrome Crypto Pay: Fetch all escrows where the specified address is the buyer. Query your purchase history from blockchain."
---

```ts
async getEscrowsByBuyer(buyer: string): Promise<Escrow[]>
```

Queries the subgraph to retrieve all escrows where the given address is the **buyer**.

#### Parameters
- `buyer: string` – The buyer's wallet address

#### Returns
`Promise<Escrow[]>` – Array of escrow objects

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const escrows = await sdk.getEscrowsByBuyer("0xBuyerAddress...");

console.log(`Found ${escrows.length} escrows as buyer`);

escrows.forEach(escrow => {
  console.log(`Escrow #${escrow.id}: ${escrow.state}`);
  console.log(`  Seller: ${escrow.seller}`);
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
- Display buyer's purchase history
- Show pending deliveries for the buyer
- Track dispute status across all buyer escrows
