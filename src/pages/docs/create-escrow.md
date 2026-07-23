---
title: createEscrow
description: "Palindrome Crypto Pay: Create a new escrow deal on-chain as the seller. Set token, amount, buyer, arbiter, and maturity terms."
---

```ts
async createEscrow(
  walletClient: WalletClient,
  params: CreateEscrowParams
): Promise<{ escrowId: bigint; txHash: Hex; walletAddress: Address; signatureValid: boolean; verificationError?: string }>
```

Creates a **new escrow** on the Palindrome contract. Must be called by the **seller** (or anyone paying gas). The buyer does **not** need to sign or pay anything at this stage.

#### Parameters

```ts
interface CreateEscrowParams {
  token: Address                  // USDT or allowed token
  buyer: Address                  // Buyer's wallet
  amount: bigint                  // Amount in token decimals (e.g. 1000 USDT = 1000000000n)
  maturityTimeDays?: bigint       // Optional: auto-release after X days (0 = no auto-release)
  arbiter?: Address               // Optional: dispute resolver (default = zero address)
  arbiterFeeBps?: number          // Optional: arbiter fee in basis points, 0-2000 (max 20%); must be 0 without an arbiter
  title: string                   // Deal title (shown in UI)
  ipfsHash?: string               // Optional: IPFS hash of description/images
}
```

#### Returns
- `escrowId` – The new escrow ID
- `txHash` – Transaction hash
- `walletAddress` – The escrow's dedicated multisig wallet address
- `signatureValid` – Whether the wallet authorization signature was verified
- `verificationError?` – Error message if signature verification failed

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { parseUnits } from 'viem';

const { sdk, walletClient } = await connectAndInitSDK();

try {
  const result = await sdk.createEscrow(walletClient, {
    token: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", // USDT (Base Sepolia)
    buyer: "0xbuyer123...",
    amount: parseUnits("1250", 18),        // 1250 USDT
    maturityTimeDays: 7n,                  // Auto-release after 7 days
    arbiter: "0x0000000000000000000000000000000000000000", // No arbiter
    title: "Brand New iPhone 15 Pro Max 512GB",
    ipfsHash: "QmZx123...",                // Optional description + images
  });

  console.log("Escrow created successfully!");
  console.log("Escrow ID:", result.escrowId.toString());
  console.log("Tx:", result.txHash);
  console.log("Wallet:", result.walletAddress);

} catch (error: any) {
  console.error("Failed to create escrow:", error.shortMessage || error.message);
}
```

#### With an arbiter and arbiter fee

If you set an arbiter, you can grant them a fee (paid only when the arbiter resolves a dispute). The fee is expressed in basis points; the exported constant `MAX_ARBITER_FEE_BPS` (2000 = 20%) is the upper bound.

```ts
const result = await sdk.createEscrow(walletClient, {
  token: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", // USDT (Base Sepolia)
  buyer: "0xbuyer123...",
  amount: parseUnits("1250", 18),
  arbiter: "0xarbiter456...",
  arbiterFeeBps: 250, // 2.5% fee for the arbiter on dispute resolution
  title: "Brand New iPhone 15 Pro Max 512GB",
});
```

**See also** → [`createEscrowAndDeposit()`](/docs/create-escrow-and-deposit) · [`deposit()`](/docs/deposit) · [`setArbiterSigned()`](/docs/set-arbiter-signed)