---
title: predictWalletAddress
description: "Palindrome Crypto Pay: Predict the escrow wallet address before escrow creation using CREATE2 deterministic deployment."
---

```ts
async predictWalletAddress(escrowId: bigint): Promise<Address>
```

Predicts the wallet address that will be created for a given escrow ID. Uses CREATE2 deterministic address computation.

This is useful for pre-signing wallet authorizations before the escrow exists.

#### Parameters
- `escrowId: bigint` – The escrow ID (use `getNextEscrowId()` to get upcoming ID)

#### Returns
`Promise<Address>` – The predicted wallet address

```ts
import { createPalindromeSDK, connectAndInitSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromepay/sdk';

const { sdk } = await connectAndInitSDK();

// Get the next escrow ID
const nextId = await sdk.getNextEscrowId();
console.log("Next escrow ID:", nextId);

// Predict the wallet address
const walletAddress = await sdk.predictWalletAddress(nextId);
console.log("Predicted wallet:", walletAddress);

// Now you can pre-sign the wallet authorization (bound to one outcome)
const sig = await sdk.signWalletAuthorization(walletClient, walletAddress, nextId, EscrowState.COMPLETE);
```

#### How CREATE2 Works

The wallet address is deterministically computed from:
1. **Factory address** – The escrow contract
2. **Salt** – Hash of the escrow ID
3. **Bytecode hash** – The wallet contract bytecode

```ts
// Simplified CREATE2 formula
address = keccak256(
  0xff,
  factoryAddress,
  keccak256(escrowId),
  bytecodeHash
)[12:]
```

#### Pre-signing Pattern

```ts
async function createEscrowWithPreSign(walletClient: WalletClient, params: CreateEscrowParams) {
  const sdk = createPalindromeSDK(walletClient);

  // Step 1: Get next ID and predict wallet
  const nextId = await sdk.getNextEscrowId();
  const predictedWallet = await sdk.predictWalletAddress(nextId);

  // Step 2: Pre-sign wallet authorization (bound to the COMPLETE outcome)
  const sellerWalletSig = await sdk.signWalletAuthorization(
    walletClient,
    predictedWallet,
    nextId,
    EscrowState.COMPLETE
  );

  // Step 3: Create escrow (SDK does this internally)
  const result = await sdk.createEscrow(walletClient, params);

  // Verify prediction was correct
  const escrow = await sdk.getEscrowByIdParsed(result.escrowId);
  console.log("Actual wallet:", escrow.wallet);
  console.log("Predicted:", predictedWallet);
  console.log("Match:", escrow.wallet === predictedWallet); // true
}
```

#### Verification

```ts
// After escrow creation, verify the prediction
const escrow = await sdk.getEscrowByIdParsed(escrowId);
const predicted = await sdk.predictWalletAddress(escrowId);

if (escrow.wallet !== predicted) {
  console.error("Wallet prediction mismatch!");
} else {
  console.log("Wallet address verified");
}
```

**See also** → [`getNextEscrowId()`](/docs/get-next-escrow-id) · [`signWalletAuthorization()`](/docs/sign-wallet-authorization)
