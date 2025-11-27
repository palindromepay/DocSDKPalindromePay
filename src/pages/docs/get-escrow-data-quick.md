---
title: getEscrowDataQuick
description: Get basic escrow data directly from the contract (fast, no subgraph delay)
---

```ts
async getEscrowDataQuick(escrowId: bigint): Promise<{
  id: string;
  buyer: Address;
  seller: Address;
  arbiter: Address;
  amount: bigint;
  token: Address;
  state: EscrowState;
  stateName: string;
  maturityTime: bigint;
  depositTime: bigint;
  buyerCancelRequested: boolean;
  sellerCancelRequested: boolean;
}>
```

Reads essential escrow data **directly from the blockchain** — no subgraph indexing required. Perfect for showing **real-time** escrow status (e.g., newly created deals that The Graph hasn’t indexed yet).

**Parameters**  
`escrowId: bigint` – The escrow ID

**Returns**  
Clean object with the most important fields + human-readable `stateName`

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

try {
  const quick = await sdk.getEscrowDataQuick(123n);

  console.log("Real-time escrow data:", {
    id: quick.id,
    buyer: quick.buyer,
    seller: quick.seller,
    arbiter: quick.arbiter === "0x0000000000000000000000000000000000000000" ? "None" : quick.arbiter,
    amount: quick.amount,
    token: quick.token,
    status: quick.stateName,   // e.g. "AWAITING_PAYMENT"
    depositTime: quick.depositTime > 0n 
      ? new Date(Number(quick.depositTime) * 1000).toLocaleString() 
      : "Not deposited yet",
    maturityDeadline: quick.maturityTime > 0n 
      ? new Date(Number(quick.maturityTime) * 1000).toLocaleString() 
      : "No deadline",
    cancelRequests: {
      buyer: quick.buyerCancelRequested,
      seller: quick.sellerCancelRequested,
    },
  });
} catch (error) {
  console.error("Failed to load quick escrow data:", error);
}
```

**Sample Output**

```ts
{
  id: "123",
  buyer: "0xbuyer...",
  seller: "0xseller...",
  arbiter: "None",
  amount: 999000000n,
  token: "0x55d398326f99059fF775485246999027B3197955",
  state: 0,
  stateName: "AWAITING_PAYMENT",
  depositTime: 0n,
  maturityTime: 0n,
  buyerCancelRequested: false,
  sellerCancelRequested: false
}
```