---
title: getEscrowByIdParsed
description: "Palindrome Crypto Pay: Get fully parsed and typed escrow data from the contract. Returns strongly-typed TypeScript objects."
---

```ts
async getEscrowByIdParsed(escrowId: bigint): Promise<EscrowData>
```

Same as `getEscrowById()` but automatically converts the raw on-chain tuple into a clean, strongly-typed `EscrowData` object with named fields and proper types — perfect for UI and logic.

**Returns**  
`Promise<EscrowData>` – Structured escrow object

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

try {
  const escrow = await sdk.getEscrowByIdParsed(5n);

  console.log('Parsed escrow:', {
    id: 5n,
    token: escrow.token,
    buyer: escrow.buyer,
    seller: escrow.seller,
    arbiter: escrow.arbiter,
    amount: escrow.amount,
    state: escrow.state,      
    stateName: ['AWAITING_PAYMENT', 'AWAITING_DELIVERY', 'DISPUTED', 'COMPLETE', 'REFUNDED', 'CANCELED'][escrow.state],
    depositTime: Number(escrow.depositTime),
    maturityTime: Number(escrow.maturityTime),
    buyerCancelRequested: escrow.buyerCancelRequested,
    sellerCancelRequested: escrow.sellerCancelRequested,
  });
} catch (error) {
  console.error('Failed to fetch parsed escrow:', error);
}
```

**Sample Output**

```ts
{
  token: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",  // USDT (Base Sepolia)
  buyer: "0xbuyer...",
  seller: "0xseller...",
  arbiter: "0x0000000000000000000000000000000000000000",
  wallet: "0xEscrowWallet...",
  amount: 1250000000n,
  depositTime: 1719823500n,
  maturityTime: 1720428300n,
  maturityDuration: 604800n,         // maturity window in seconds
  disputeStartTime: 0n,
  state: 1,                          // EscrowState.AWAITING_DELIVERY
  buyerCancelRequested: false,
  sellerCancelRequested: false,
  tokenDecimals: 6,
  arbiterFeeBps: 0,                  // arbiter fee in basis points (0-2000)
  sellerWalletSig: "0x...",
  buyerWalletSig: "0x...",
  arbiterWalletSig: "0x..."
}
```