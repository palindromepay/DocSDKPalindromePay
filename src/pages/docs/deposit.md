---
title: deposit
description: "Palindrome Crypto Pay: Buyer deposits funds into the escrow. Automatically handles USDT token approval and deposit in a secure blockchain transaction."
---

```ts
async deposit(walletClient: WalletClient, escrowId: bigint): Promise<{ txHash: Hex; signatureValid: boolean }>
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
`Promise<{ txHash: Hex; signatureValid: boolean }>` – Transaction hash and signature verification result

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer's wallet

try {
  const { txHash, signatureValid } = await sdk.deposit(walletClient, 42n);

  console.log("Deposit successful!");
  console.log("Transaction:", txHash);
  console.log("Signature valid:", signatureValid);
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

{% callout type="warning" title="Expired escrows cannot be funded" %}
If the escrow's maturity time has already passed, `deposit()` fails fast with an `SDKError` ("Escrow expired - maturity time has passed") before sending any transaction. On success, the contract re-anchors the maturity window at deposit time.
{% /callout %}

**See also** → [`createEscrowAndDeposit()`](/docs/create-escrow-and-deposit) · [`acceptEscrow()`](/docs/accept-escrow)
