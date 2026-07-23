---
title: signSetArbiter
description: "Palindrome Crypto Pay: Sign an EIP-712 SetArbiter authorization to assign an arbiter to an arbiterless escrow by mutual consent."
---

```ts
async signSetArbiter(
  walletClient: WalletClient,
  escrowId: bigint,
  newArbiter: Address,
  arbiterFeeBps: number,
  deadline: bigint,
  nonce: bigint
): Promise<Hex>
```

Signs an EIP-712 `SetArbiter` authorization. **Buyer and seller must each sign the exact same struct** (same `newArbiter`, `arbiterFeeBps`, `deadline`, and **shared nonce**); both signatures are then submitted together via [`setArbiterSigned()`](/docs/set-arbiter-signed). The arbiter itself does not sign.

#### Parameters
- `walletClient: WalletClient` – Buyer's or seller's connected wallet
- `escrowId: bigint` – The escrow ID
- `newArbiter: Address` – The arbiter to assign
- `arbiterFeeBps: number` – Arbiter fee in basis points (0–2000, max 20%)
- `deadline: bigint` – Unix timestamp when the signature expires (at most 1 day in the future)
- `nonce: bigint` – Shared nonce, identical for both signers (consumed for both on submission)

#### Returns
`Promise<Hex>` – 65-byte EIP-712 signature

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK(); // buyer OR seller

const escrowId = 42n;
const newArbiter = "0xarbiter456...";
const arbiterFeeBps = 250; // 2.5%

// Both parties must use the SAME deadline and nonce
const deadline = await sdk.createSignatureDeadline(60); // max 1 day
const nonce = await sdk.getUserNonce(escrowId, walletClient.account.address);

const signature = await sdk.signSetArbiter(
  walletClient,
  escrowId,
  newArbiter,
  arbiterFeeBps,
  deadline,
  nonce
);

console.log("SetArbiter signature:", signature);
// Share { newArbiter, arbiterFeeBps, deadline, nonce } with the other
// party so they can produce a matching signature.
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
  SetArbiter: [
    { name: "escrowId", type: "uint256" },
    { name: "newArbiter", type: "address" },
    { name: "arbiterFeeBps", type: "uint16" },
    { name: "deadline", type: "uint256" },
    { name: "nonce", type: "uint256" }
  ]
}
```

**See also** → [`setArbiterSigned()`](/docs/set-arbiter-signed) · [`createSignatureDeadline()`](/docs/create-signature-deadline) · [`getUserNonce()`](/docs/get-user-nonce)
