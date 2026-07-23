---
title: signConfirmDelivery
description: "Palindrome Crypto Pay: Sign EIP-712 message for gasless confirm delivery. Enables buyers to confirm without paying gas fees."
---

```ts
async signConfirmDelivery(
  walletClient: WalletClient,
  escrowId: bigint,
  deadline: bigint,
  nonce: bigint
): Promise<Hex>
```

Signs an EIP-712 typed message for gasless confirm delivery. The buyer signs off-chain, and anyone can submit the signature on-chain to release funds.

#### Parameters
- `walletClient: WalletClient` – Buyer's connected wallet
- `escrowId: bigint` – The escrow ID
- `deadline: bigint` – Unix timestamp when signature expires
- `nonce: bigint` – User's nonce (from `getUserNonce()`)

#### Returns
`Promise<Hex>` – 65-byte EIP-712 signature

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // buyer

const escrowId = 42n;

try {
  // Step 1: Get nonce and create deadline
  const nonce = await sdk.getUserNonce(escrowId, walletClient.account.address);
  const deadline = await sdk.createSignatureDeadline(60); // 60 minutes

  // Step 2: Sign the confirm delivery message
  const signature = await sdk.signConfirmDelivery(
    walletClient,
    escrowId,
    deadline,
    nonce
  );

  console.log("Signature:", signature);
  console.log("Deadline:", new Date(Number(deadline) * 1000));
  console.log("Nonce:", nonce);

  // Step 3: Send to relayer or submit yourself
  // ...

} catch (error: any) {
  console.error("Signing failed:", error.message);
}
```

#### Signature Structure (EIP-712)

```ts
// Domain
{
  name: "PalindromePay",
  version: "1",
  chainId: 84532,  // chain-dependent: 8453 Base mainnet, 84532 Base Sepolia
  verifyingContract: contractAddress
}

// Types
{
  ConfirmDelivery: [
    { name: "escrowId", type: "uint256" },
    { name: "buyer", type: "address" },
    { name: "seller", type: "address" },
    { name: "arbiter", type: "address" },
    { name: "token", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "depositTime", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "nonce", type: "uint256" }
  ]
}
```

#### Full Gasless Flow

{% callout %}
Prefer [`prepareConfirmDeliverySigned()`](/docs/prepare-confirm-delivery-signed) — it fetches the nonce, creates the deadline, and produces both signatures in a single call.
{% /callout %}

```ts
import { EscrowState } from '@palindromepay/sdk';

// 1. Buyer signs (no gas)
const nonce = await sdk.getUserNonce(escrowId, buyerAddress);
const deadline = await sdk.createSignatureDeadline(60);
const coordSig = await sdk.signConfirmDelivery(walletClient, escrowId, deadline, nonce);
const walletSig = await sdk.signWalletAuthorization(
  walletClient,
  escrowWallet,
  escrowId,
  EscrowState.COMPLETE
);

// 2. Send signatures to backend
await sendToRelayer({ escrowId, coordSig, walletSig, deadline, nonce });

// 3. Relayer submits on-chain
await sdk.confirmDeliverySigned(relayerWallet, escrowId, coordSig, deadline, nonce, walletSig);
```

**See also** → [`confirmDeliverySigned()`](/docs/confirm-delivery-signed) · [`getUserNonce()`](/docs/get-user-nonce) · [`createSignatureDeadline()`](/docs/create-signature-deadline)
