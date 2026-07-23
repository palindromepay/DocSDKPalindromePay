---
title: getUserNonce
description: "Palindrome Crypto Pay: Get the next available nonce for a signer's signed transactions. Essential for gasless meta-transactions."
---

```ts
async getUserNonce(escrowId: bigint, signer: Address): Promise<bigint>
```

Queries the contract's nonce bitmap and returns the first unused nonce for a specific escrow and signer combination. This is the recommended way to get a nonce for signed transactions.

Nonces prevent replay attacks — each signature can only be used once.

#### Parameters
- `escrowId: bigint` – The escrow ID
- `signer: Address` – The signer's wallet address

#### Returns
`Promise<bigint>` – The next available nonce

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const escrowId = 42n;
const userAddress = walletClient.account.address;

// Get next available nonce
const nonce = await sdk.getUserNonce(escrowId, userAddress);
console.log("Next nonce:", nonce); // 0n, 1n, 2n, etc.

// Use in signature
const deadline = await sdk.createSignatureDeadline(60);
const signature = await sdk.signConfirmDelivery(
  walletClient,
  escrowId,
  deadline,
  nonce  // Use the nonce here
);
```

#### How Nonces Work

The contract uses a **bitmap** to track used nonces efficiently:
- Each escrow + signer pair has its own nonce space
- Nonces don't need to be sequential (bitmap allows gaps)
- Up to 25,600 nonces per escrow per signer (100 words × 256 bits)

```ts
// Nonce 0 used → bitmap: 0b0001
// Nonce 2 used → bitmap: 0b0101
// Nonce 1 still available!
```

#### Checking Specific Nonce

```ts
// Check if a specific nonce is already used
const isUsed = await sdk.isNonceUsed(escrowId, signer, 5n);
console.log("Nonce 5 used:", isUsed);
```

#### Batch Operations

```ts
// Get multiple nonces at once for batch signing
const nonces = await sdk.getMultipleNonces(escrowId, signer, 5);
console.log("Available nonces:", nonces); // [0n, 1n, 2n, 3n, 4n]
```

#### Error Handling

```ts
try {
  const nonce = await sdk.getUserNonce(escrowId, signer);
} catch (error: any) {
  if (error.message.includes("Nonce space exhausted")) {
    // Very rare — user has used 25,600+ nonces for this escrow
    console.error("Too many nonces used");
  }
}
```

**See also** → [`isNonceUsed()`](/docs/is-nonce-used) · [`getMultipleNonces()`](/docs/get-multiple-nonces) · [`getNonceBitmap()`](/docs/get-nonce-bitmap)
