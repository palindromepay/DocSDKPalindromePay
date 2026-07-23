---
title: withdraw
description: "Palindrome Crypto Pay: Withdraw funds from an escrow wallet after the deal is complete, refunded, or cancelled."
---

```ts
async withdraw(
  walletClient: WalletClient,
  escrowId: bigint
): Promise<Hex>
```

Withdraws funds from an escrow wallet. The SDK automatically determines the token, amount, and destination based on the escrow state and caller. Requires proper authorization (2-of-3 multisig).

#### Parameters
- `walletClient: WalletClient` – Authorized signer's wallet
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<Hex>` – Transaction hash

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

try {
  const txHash = await sdk.withdraw(walletClient, 42n);

  console.log("Withdrawal successful!");
  console.log("Transaction:", txHash);

} catch (error: any) {
  if (error.message.includes("not authorized")) {
    alert("You are not authorized to withdraw from this escrow");
  } else if (error.message.includes("insufficient balance")) {
    alert("Insufficient balance in escrow wallet");
  } else {
    console.error("Withdrawal failed:", error.shortMessage || error.message);
  }
}
```

#### When Can You Withdraw?
| Escrow State | Who Can Withdraw |
|--------------|------------------|
| `COMPLETE` | Seller (minus fee) |
| `REFUNDED` | Buyer (full amount) |
| `CANCELED` | Buyer (full amount) |

#### Related Methods
- [`getTokenBalance()`](/docs/get-token-balance) – Check token balance
- [`predictWalletAddress()`](/docs/predict-wallet-address) – Get escrow wallet address
