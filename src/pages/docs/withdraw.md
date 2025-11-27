---
title: withdraw
description: Claim your funds after escrow is finalized (Complete, Refunded, or Canceled)
---

```ts
async withdraw(walletClient: WalletClient, escrowId: bigint): Promise<string>
```

**Called by buyer or seller** to withdraw their entitled funds once the escrow has reached a final state:

- `COMPLETE` → seller gets funds
- `REFUNDED` → buyer gets funds back
- `CANCELED` → buyer gets funds back

No action needed from the other party — just call `withdraw()`.

#### Parameters
- `walletClient: WalletClient` – Your connected wallet (buyer or seller)
- `escrowId: bigint`

#### Returns
`Promise<string>` – Transaction hash

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // your wallet

try {
  const txHash = await sdk.withdraw(walletClient, 42n);

  console.log("Funds withdrawn successfully!");
  console.log("Transaction:", txHash);

  // Tokens are now in your wallet
  // Escrow state → WITHDRAWN (if both parties claimed)

} catch (error: any) {
  if (error.code === "INVALID_STATE") {
    alert("Escrow is not finalized yet — cannot withdraw");
  } else if (error.code === "TRANSACTION_FAILED") {
    alert("Withdraw failed — funds may already be claimed");
  } else {
    console.error("Withdraw error:", error.shortMessage || error.message);
  }
}
```

#### Final States That Allow Withdraw

| State        | Who Gets Funds     | Who Can Call `withdraw` |
|--------------|--------------------|--------------------------|
| `COMPLETE`   | Seller (minus fee) | Seller                   |
| `REFUNDED`   | Buyer (full amount)| Buyer                    |
| `CANCELED`   | Buyer (full amount)| Buyer                    |
