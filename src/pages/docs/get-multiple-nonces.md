---
title: getMultipleNonces
description: "Palindrome Crypto Pay: Get multiple available nonces at once for batch operations. Optimized for high-throughput escrow workflows."
---

```ts
async getMultipleNonces(
  escrowId: bigint,
  signer: Address,
  count: number
): Promise<bigint[]>
```

Retrieves multiple available nonces in a single call. Useful for batch signing operations where you need several nonces at once.

#### Parameters
- `escrowId: bigint` – The escrow ID
- `signer: Address` – The signer's wallet address
- `count: number` – Number of nonces to retrieve (max 256)

#### Returns
`Promise<bigint[]>` – Array of available nonces

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const escrowId = 42n;
const signer = walletClient.account.address;

// Get 5 available nonces
const nonces = await sdk.getMultipleNonces(escrowId, signer, 5);
console.log("Available nonces:", nonces);
// [0n, 1n, 2n, 3n, 4n]

// Use each nonce for different signatures
for (const nonce of nonces) {
  const deadline = await sdk.createSignatureDeadline(60);
  const sig = await sdk.signConfirmDelivery(walletClient, escrowId, deadline, nonce);
  // Store signature for later use...
}
```

#### Batch Signing Pattern

```ts
async function prepareBatchSignatures(escrowIds: bigint[], walletClient: WalletClient) {
  const signer = walletClient.account.address;
  const signatures = [];

  for (const escrowId of escrowIds) {
    // Get a nonce for each escrow
    const nonces = await sdk.getMultipleNonces(escrowId, signer, 1);
    const nonce = nonces[0];
    const deadline = await sdk.createSignatureDeadline(60);

    const sig = await sdk.signConfirmDelivery(walletClient, escrowId, deadline, nonce);
    signatures.push({ escrowId, sig, deadline, nonce });
  }

  return signatures;
}
```

#### Pre-signing Multiple Actions

```ts
// Pre-sign multiple potential actions for same escrow
const escrowId = 42n;
const nonces = await sdk.getMultipleNonces(escrowId, signer, 3);

const deadline = await sdk.createSignatureDeadline(120); // 2 hours

// Sign confirm delivery with nonce 0
const confirmSig = await sdk.signConfirmDelivery(walletClient, escrowId, deadline, nonces[0]);

// Sign start dispute with nonce 1
const disputeSig = await sdk.signStartDispute(walletClient, escrowId, deadline, nonces[1]);

// User can choose which action to take — only one will be used
// The other signature becomes invalid once one is submitted
```

#### Error Handling

```ts
try {
  // Requesting too many nonces
  const nonces = await sdk.getMultipleNonces(escrowId, signer, 300);
} catch (error: any) {
  if (error.message.includes("Cannot request more than 256")) {
    console.error("Max 256 nonces per request");
  }
  if (error.message.includes("Only found")) {
    console.error("Not enough available nonces");
  }
}
```

**See also** → [`getUserNonce()`](/docs/get-user-nonce) · [`isNonceUsed()`](/docs/is-nonce-used)
