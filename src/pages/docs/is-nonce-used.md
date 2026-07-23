---
title: isNonceUsed
description: "Palindrome Crypto Pay: Check if a specific nonce has been used for an escrow signer. Prevents replay attacks in signed transactions."
---

```ts
async isNonceUsed(
  escrowId: bigint,
  signer: Address,
  nonce: bigint
): Promise<boolean>
```

Checks whether a specific nonce has already been used by a signer for a particular escrow. Useful for verifying signature validity before submission.

#### Parameters
- `escrowId: bigint` – The escrow ID
- `signer: Address` – The signer's wallet address
- `nonce: bigint` – The nonce to check

#### Returns
`Promise<boolean>` – `true` if nonce is used, `false` if available

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const escrowId = 42n;
const signer = walletClient.account.address;

// Check if nonce 0 is used
const nonce0Used = await sdk.isNonceUsed(escrowId, signer, 0n);
console.log("Nonce 0 used:", nonce0Used);

// Check if nonce 5 is used
const nonce5Used = await sdk.isNonceUsed(escrowId, signer, 5n);
console.log("Nonce 5 used:", nonce5Used);
```

#### Validation Before Submission

```ts
async function submitSignedTransaction(
  escrowId: bigint,
  signature: Hex,
  deadline: bigint,
  nonce: bigint,
  signer: Address
) {
  // Verify nonce is still valid
  const isUsed = await sdk.isNonceUsed(escrowId, signer, nonce);

  if (isUsed) {
    throw new Error("Nonce already used — signature is invalid");
  }

  // Proceed with submission
  return await sdk.confirmDeliverySigned(...);
}
```

#### Relayer Validation

```ts
// Backend: Validate incoming signature request
app.post('/api/relay', async (req, res) => {
  const { escrowId, signature, deadline, nonce, signer } = req.body;

  // Check nonce hasn't been used
  const isUsed = await sdk.isNonceUsed(BigInt(escrowId), signer, BigInt(nonce));
  if (isUsed) {
    return res.status(400).json({ error: "Nonce already used" });
  }

  // Check deadline hasn't expired
  if (sdk.isSignatureDeadlineExpired(BigInt(deadline))) {
    return res.status(400).json({ error: "Signature expired" });
  }

  // Submit transaction
  const txHash = await sdk.startDisputeSigned(...);
  res.json({ success: true, txHash });
});
```

**See also** → [`getUserNonce()`](/docs/get-user-nonce) · [`getNonceBitmap()`](/docs/get-nonce-bitmap)
