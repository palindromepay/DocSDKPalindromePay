---
title: getEscrowById
description: Read raw escrow data directly from the smart contract by ID
---

```ts
async getEscrowById(escrowId: bigint): Promise<any>
```

Fetches the raw escrow tuple straight from the contract’s `escrows(uint256)` view function. Returns data exactly as stored on-chain (no subgraph indexing delay).

**Parameters**  
`escrowId: bigint` – The numeric ID of the escrow

**Returns**  
Raw array/tuple with values in contract order (token, buyer, seller, arbiter, amount, depositTime, maturityTime, nonce, state, buyerCancelRequested, sellerCancelRequested)

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

try {
  const rawEscrow = await sdk.getEscrowById(5n);

  console.log('Raw escrow data from contract:', rawEscrow);
  // Example output:
  // [
  //   "0x55d398326f99059fF775485246999027B3197955", // token (USDT)
  //   "0xbuyer...",                                 // buyer
  //   "0xseller...",                                // seller
  //   "0x0000000000000000000000000000000000000000", // arbiter (if none)
  //   1250000000n,                                 // amount
  //   1719823500n,                                 // depositTime
  //   1720428300n,                                 // maturityTime
  //   1n,                                          // nonce
  //   1,                                           // state (1 = AWAITING_DELIVERY)
  //   false,                                       // buyerCancelRequested
  //   false                                        // sellerCancelRequested
  // ]
} catch (error) {
  console.error('Failed to read escrow:', error);
}
```

**When to use**  
- You need instant, real-time data (even before The Graph indexes it)  
- You want the source-of-truth on-chain values  
- You’re building transaction logic that depends on current contract state

**Tip** → For a cleaner, typed version use `getEscrowByIdParsed()` instead.
