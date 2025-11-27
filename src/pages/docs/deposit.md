---
title: deposit
description: Buyer deposits funds into the escrow (automatically handles USDT approve + deposit)
---

```ts
async deposit(walletClient: WalletClient, escrowId: bigint): Promise<string>
```

**Called by the buyer** to lock the agreed amount of tokens into the escrow contract.

The SDK does everything for you:
- Checks your balance
- Resets allowance if needed (USDT pattern)
- Approves the exact amount
- Calls `deposit(escrowId)` on the contract

#### Parameters
- `walletClient: WalletClient` – Buyer’s connected wallet
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<string>` – Transaction hash

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer's wallet

try {
  const txHash = await sdk.deposit(walletClient, 42n);

  console.log("Deposit successful!");
  console.log("Transaction:", txHash);
  console.log("Funds are now locked in escrow #42");

  // Escrow state → AWAITING_DELIVERY
  // Seller must now deliver the product/service

} catch (error: any) {
  if (error.code === "INSUFFICIENT_BALANCE") {
    alert("Not enough USDT in your wallet");
  } else if (error.code === "ALLOWANCE_FAILED") {
    alert("Approval failed — try again");
  } else {
    console.error("Deposit failed:", error.shortMessage || error.message);
  }
}
```

