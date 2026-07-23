---
title: confirmDeliverySigned
description: "Palindrome Crypto Pay: Submit a gasless confirm delivery using pre-signed EIP-712 signatures. Relayer pays the gas fees."
---

```ts
async confirmDeliverySigned(
  walletClient: WalletClient,
  escrowId: bigint,
  coordSignature: Hex,
  deadline: bigint,
  nonce: bigint,
  buyerWalletSig: Hex
): Promise<Hex>
```

Submits a confirm delivery transaction using pre-signed EIP-712 signatures. The buyer signs off-chain (no gas), and **anyone** (relayer, seller, or the buyer themselves) can submit the signature on-chain.

Perfect for mobile users, dApp UX, or reducing buyer friction.

#### Parameters
- `walletClient: WalletClient` – Wallet submitting the transaction (pays gas)
- `escrowId: bigint` – The escrow ID
- `coordSignature: Hex` – Buyer's EIP-712 confirmation signature
- `deadline: bigint` – Signature expiration timestamp
- `nonce: bigint` – Buyer's nonce for replay protection
- `buyerWalletSig: Hex` – Buyer's wallet authorization signature

#### Returns
`Promise<Hex>` – Transaction hash

#### Full Flow

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromepay/sdk';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer

const escrowId = 42n;
const buyerAddress = walletClient.account.address;

try {
  // Step 1: Get escrow data
  const escrow = await sdk.getEscrowByIdParsed(escrowId);

  // Step 2: Get nonce and create deadline
  const nonce = await sdk.getUserNonce(escrowId, buyerAddress);
  const deadline = await sdk.createSignatureDeadline(60); // 60 minutes

  // Step 3: Sign the confirmation message (buyer signs, no gas)
  const coordSignature = await sdk.signConfirmDelivery(
    walletClient,
    escrowId,
    deadline,
    nonce
  );

  // Step 4: Sign wallet authorization (bound to the COMPLETE outcome)
  const buyerWalletSig = await sdk.signWalletAuthorization(
    walletClient,
    escrow.wallet,
    escrowId,
    EscrowState.COMPLETE
  );

  // Step 5: Submit on-chain (can be same wallet or relayer)
  const txHash = await sdk.confirmDeliverySigned(
    walletClient,           // or relayerWallet
    escrowId,
    coordSignature,
    deadline,
    nonce,
    buyerWalletSig
  );

  console.log("Delivery confirmed!");
  console.log("Funds released to seller");
  console.log("Tx:", txHash);

  // State → COMPLETE

} catch (error: any) {
  if (error.code === "SIGNATURE_EXPIRED") {
    alert("Signature deadline passed — please sign again");
  } else if (error.code === "NOT_BUYER") {
    alert("Only the buyer can sign the confirmation");
  } else {
    console.error("Confirm failed:", error.shortMessage || error.message);
  }
}
```

#### Manual Signing (Advanced)

If you need more control over the signing process:

```ts
const escrowId = 42n;
const escrow = await sdk.getEscrowByIdParsed(escrowId);

// Get nonce and deadline
const nonce = await sdk.getUserNonce(escrowId, buyerAddress);
const deadline = await sdk.createSignatureDeadline(60); // 60 minutes

// Sign the confirmation message
const coordSignature = await sdk.signConfirmDelivery(
  walletClient,
  escrowId,
  deadline,
  nonce
);

// Sign wallet authorization (bound to the COMPLETE outcome)
const buyerWalletSig = await sdk.signWalletAuthorization(
  walletClient,
  escrow.wallet,
  escrowId,
  EscrowState.COMPLETE
);

// Submit (can be done later by relayer)
const txHash = await sdk.confirmDeliverySigned(
  relayerWallet,
  escrowId,
  coordSignature,
  deadline,
  nonce,
  buyerWalletSig
);
```

#### Relayer Pattern

```ts
// Frontend: Buyer prepares signatures
const escrow = await sdk.getEscrowByIdParsed(escrowId);
const nonce = await sdk.getUserNonce(escrowId, buyerAddress);
const deadline = await sdk.createSignatureDeadline(60);
const coordSignature = await sdk.signConfirmDelivery(walletClient, escrowId, deadline, nonce);
const buyerWalletSig = await sdk.signWalletAuthorization(walletClient, escrow.wallet, escrowId, EscrowState.COMPLETE);

// Send to backend
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

// Backend: Relayer submits
const txHash = await sdk.confirmDeliverySigned(
  relayerWallet,
  BigInt(escrowId),
  coordSignature,
  BigInt(deadline),
  BigInt(nonce),
  buyerWalletSig
);
```

**See also** → [`signConfirmDelivery()`](/docs/sign-confirm-delivery) · [`confirmDelivery()`](/docs/confirm-delivery) · [`getUserNonce()`](/docs/get-user-nonce)
