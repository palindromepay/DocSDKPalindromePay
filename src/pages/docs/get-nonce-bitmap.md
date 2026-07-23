---
title: getNonceBitmap
description: "Palindrome Crypto Pay: Get the raw nonce bitmap from the contract for advanced nonce management in signed transactions."
---

```ts
async getNonceBitmap(
  escrowId: bigint,
  signer: Address,
  wordIndex: bigint = 0n
): Promise<bigint>
```

Retrieves the raw nonce bitmap from the contract. Each bitmap word contains 256 nonce states. A set bit means the nonce is used.

This is a low-level function — most users should use `getUserNonce()` instead.

#### Parameters
- `escrowId: bigint` – The escrow ID
- `signer: Address` – The signer's wallet address
- `wordIndex: bigint` – The word index (nonce / 256), default 0

#### Returns
`Promise<bigint>` – 256-bit bitmap where each bit represents a nonce's used status

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const escrowId = 42n;
const signer = walletClient.account.address;

// Get first bitmap word (nonces 0-255)
const bitmap0 = await sdk.getNonceBitmap(escrowId, signer, 0n);
console.log("Bitmap word 0:", bitmap0.toString(2)); // Binary representation

// Get second bitmap word (nonces 256-511)
const bitmap1 = await sdk.getNonceBitmap(escrowId, signer, 1n);
```

#### Understanding the Bitmap

```ts
// Example: nonces 0, 2, and 5 are used
// bitmap = 0b100101 = 37n

const bitmap = 37n;

// Check if nonce 0 is used: bit 0
const nonce0Used = (bitmap & (1n << 0n)) !== 0n; // true

// Check if nonce 1 is used: bit 1
const nonce1Used = (bitmap & (1n << 1n)) !== 0n; // false

// Check if nonce 2 is used: bit 2
const nonce2Used = (bitmap & (1n << 2n)) !== 0n; // true
```

#### Nonce to Word Index

```ts
function getNoncePosition(nonce: bigint) {
  const wordIndex = nonce / 256n;  // Which bitmap word
  const bitIndex = nonce % 256n;   // Which bit in the word
  return { wordIndex, bitIndex };
}

// Nonce 300 → word 1, bit 44
// Nonce 1000 → word 3, bit 232
```

#### Batch Checking

```ts
// Efficiently check multiple nonces in one call
async function checkNonceRange(escrowId: bigint, signer: Address, start: bigint, count: number) {
  const results: boolean[] = [];
  const wordIndex = start / 256n;
  const bitmap = await sdk.getNonceBitmap(escrowId, signer, wordIndex);

  for (let i = 0n; i < BigInt(count); i++) {
    const bitIndex = (start + i) % 256n;
    results.push((bitmap & (1n << bitIndex)) !== 0n);
  }

  return results;
}
```

**See also** → [`getUserNonce()`](/docs/get-user-nonce) · [`isNonceUsed()`](/docs/is-nonce-used)
