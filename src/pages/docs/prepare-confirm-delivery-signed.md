---
title: prepareConfirmDeliverySigned
description: "Palindrome Crypto Pay: Generate all signatures for a gasless confirm delivery in a single call. Simplest path to relayer-based confirmation."
---

```ts
async prepareConfirmDeliverySigned(
  buyerWalletClient: WalletClient,
  escrowId: bigint
): Promise<{
  coordSignature: Hex;
  buyerWalletSig: Hex;
  deadline: bigint;
  nonce: bigint;
}>
```

One-call helper that prepares **everything** needed for a gasless confirm delivery: it fetches the buyer's nonce, creates a **60-minute** deadline, and produces both required signatures (the coordination signature and the outcome-bound wallet authorization). The result feeds directly into [`confirmDeliverySigned()`](/docs/confirm-delivery-signed), which a relayer can submit while paying the gas.

Prefer this over manually combining `getUserNonce()`, `createSignatureDeadline()`, `signConfirmDelivery()`, and `signWalletAuthorization()`.

#### Parameters
- `buyerWalletClient: WalletClient` – Buyer's connected wallet (signs, pays no gas)
- `escrowId: bigint` – The escrow ID to confirm

#### Returns
`Promise<{ coordSignature: Hex; buyerWalletSig: Hex; deadline: bigint; nonce: bigint }>` – All arguments needed for `confirmDeliverySigned()`

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // buyer

const escrowId = 42n;

try {
  // 1. Buyer prepares all signatures (no gas)
  const { coordSignature, buyerWalletSig, deadline, nonce } =
    await sdk.prepareConfirmDeliverySigned(walletClient, escrowId);

  // 2. Send to your relayer backend
  await fetch('/api/relay-confirm', {
    method: 'POST',
    body: JSON.stringify({
      escrowId: escrowId.toString(),
      coordSignature,
      buyerWalletSig,
      deadline: deadline.toString(),
      nonce: nonce.toString(),
    }),
  });

  // 3. Backend: relayer submits and pays gas
  // await sdk.confirmDeliverySigned(
  //   relayerWallet, escrowId, coordSignature, deadline, nonce, buyerWalletSig
  // );

} catch (error: any) {
  if (error.code === "NOT_BUYER") {
    alert("Only the buyer can prepare the confirmation");
  } else if (error.code === "WALLET_NOT_CONNECTED") {
    alert("Connect your wallet first");
  } else {
    console.error("Preparation failed:", error.shortMessage || error.message);
  }
}
```

**See also** → [`confirmDeliverySigned()`](/docs/confirm-delivery-signed) · [`confirmDelivery()`](/docs/confirm-delivery) · [`signConfirmDelivery()`](/docs/sign-confirm-delivery)
