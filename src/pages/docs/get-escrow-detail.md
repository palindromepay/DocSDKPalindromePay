---
title: getEscrowDetail
description: Get the complete, fully enriched escrow object from The Graph (includes title, IPFS, messages, events)
---

```ts
async getEscrowDetail(id: string): Promise<Escrow | undefined>
```

Fetches a **single escrow** by its ID using the subgraph — returns the richest possible data: title, IPFS description, dispute messages, timestamps, token metadata, participant profiles, and full event history.

**Parameters**  
`id: string` – Escrow ID as string (subgraph uses string IDs, not bigint)

**Returns**  
`Promise<Escrow | undefined>` – Full escrow object or `undefined` if not found

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

try {
  const escrow = await sdk.getEscrowDetail("42");

  if (!escrow) {
    console.log("Escrow not found or not indexed yet");
    return;
  }

  console.log("Full escrow details:", {
    id: escrow.id,
    title: escrow.title || "No title",
    ipfsHash: escrow.ipfsHash,
    amount: escrow.amount,
    token: escrow.token.symbol,
    buyer: escrow.buyer.id,
    seller: escrow.seller.id,
    arbiter: escrow.arbiter?.id || "None",
    state: escrow.state,
    createdAt: new Date(Number(escrow.createdAt) * 1000).toLocaleString(),
    depositTime: escrow.depositTime !== "0" 
      ? new Date(Number(escrow.depositTime) * 1000).toLocaleString() 
      : "Not deposited",
    maturityTime: escrow.maturityTime !== "0"
      ? new Date(Number(escrow.maturityTime) * 1000).toLocaleString()
      : "No maturity",
    disputeMessages: escrow.messages.length,
  });

  // Show dispute messages if any
  escrow.messages.forEach((msg, i) => {
    console.log(`Message ${i + 1} [${msg.role}]:`, msg.ipfsHash);
  });

} catch (error) {
  console.error("Failed to load escrow detail:", error);
}
```

**Sample Full Escrow Object**

```ts
{
  id: "42",
  title: "iPhone 15 Pro + Case & Charger",
  ipfsHash: "QmZ123...",
  amount: "1150000000",
  token: { id: "0x55d3...", symbol: "USDT" },
  buyer: { id: "0xbuyer789..." },
  seller: { id: "0xsellerabc..." },
  arbiter: { id: "0xarbiter123..." },
  state: "DISPUTED",
  createdAt: "1723100000",
  depositTime: "1723101000",
  maturityTime: "1723705800",
  messages: [
    { role: "Buyer", ipfsHash: "QmDispute1...", timestamp: "1723200000" },
    { role: "Seller", ipfsHash: "QmDispute2...", timestamp: "1723201000" }
  ]
}
```