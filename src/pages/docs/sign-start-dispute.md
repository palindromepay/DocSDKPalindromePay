---
title: signStartDispute
description: "Palindrome Crypto Pay: Sign EIP-712 typed data message for gasless dispute initiation. Enables meta-transactions for dispute flow."
---

```ts
async signStartDispute(
  walletClient: WalletClient,
  escrowId: bigint,
  deadline: bigint,
  nonce: bigint
): Promise<Hex>
```

Signs an EIP-712 typed message for gasless dispute initiation. The buyer or seller signs off-chain, and anyone can submit the signature on-chain to open a dispute.

#### Parameters
- `walletClient: WalletClient` – Buyer or seller's connected wallet
- `escrowId: bigint` – The escrow ID
- `deadline: bigint` – Unix timestamp when signature expires
- `nonce: bigint` – User's nonce (from `getUserNonce()`)

#### Returns
`Promise<Hex>` – 65-byte EIP-712 signature

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const escrowId = 42n;

try {
  // Step 1: Get nonce and create deadline
  const nonce = await sdk.getUserNonce(escrowId, walletClient.account.address);
  const deadline = await sdk.createSignatureDeadline(60); // 60 minutes

  // Step 2: Sign the start dispute message
  const signature = await sdk.signStartDispute(
    walletClient,
    escrowId,
    deadline,
    nonce
  );

  console.log("Dispute signature ready!");
  console.log("Signature:", signature);
  console.log("Valid until:", new Date(Number(deadline) * 1000));

  // Step 3: Submit on-chain (you or relayer)
  const txHash = await sdk.startDisputeSigned(
    walletClient, // or relayerWallet
    escrowId,
    signature,
    deadline,
    nonce
  );

  console.log("Dispute opened:", txHash);

} catch (error: any) {
  console.error("Signing failed:", error.message);
}
```

#### Signature Structure (EIP-712)

```typescript
// Domain
{
  name: "PalindromeCryptoEscrow",
  version: "1",
  chainId: 84532,  // Base Sepolia
  verifyingContract: contractAddress
}

// Types
{
  StartDispute: [
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

#### Relayer Pattern

```ts
// Frontend: User signs (no gas)
const signature = await sdk.signStartDispute(walletClient, escrowId, deadline, nonce);

// Send to backend
await fetch('/api/relay-dispute', {
  method: 'POST',
  body: JSON.stringify({ escrowId, signature, deadline, nonce })
});

// Backend: Relayer submits (pays gas)
await sdk.startDisputeSigned(relayerWallet, escrowId, signature, deadline, nonce);
```

**See also** → [`startDisputeSigned()`](/docs/start-dispute-signed) · [`getUserNonce()`](/docs/get-user-nonce) · [`createSignatureDeadline()`](/docs/create-signature-deadline)
