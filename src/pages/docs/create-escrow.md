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
import { createPalindromeSDK } from '@/lib/createSDK';
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