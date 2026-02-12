---
title: createEscrowAndDeposit
description: "Palindrome Crypto Pay: Create a new escrow and deposit funds in one transaction as the buyer. Streamlined escrow creation."
---

```ts
async createEscrowAndDeposit(
  walletClient: WalletClient,
  params: CreateEscrowAndDepositParams
): Promise<{ escrowId: bigint; txHash: Hex; walletAddress: Address; signatureValid: boolean; verificationError?: string }>
```

Creates a **new escrow** and **deposits funds** in a single transaction. Called by the **buyer** who wants to initiate a deal with a seller.

The escrow starts in `AWAITING_DELIVERY` state. The seller must call `acceptEscrow()` to provide their wallet signature before funds can be released.

#### Parameters

```ts
interface CreateEscrowAndDepositParams {
  token: Address                  // ERC20 token (USDT, USDC, etc.)
  seller: Address                 // Seller's wallet address
  amount: bigint                  // Amount in token decimals
  maturityTimeDays?: bigint       // Optional: auto-release after X days
  arbiter?: Address               // Optional: dispute resolver
  title: string                   // Deal title (1-256 chars)
  ipfsHash?: string               // Optional: IPFS hash for description
}
```

#### Returns
- `escrowId` – The new escrow ID
- `txHash` – Transaction hash
- `walletAddress` – The escrow's dedicated wallet address
- `signatureValid` – Whether the wallet authorization signature was verified
- `verificationError?` – Error message if signature verification failed

```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { parseUnits } from 'viem';

const { sdk, walletClient } = await connectAndInitSDK(); // buyer's wallet

try {
  const result = await sdk.createEscrowAndDeposit(walletClient, {
    token: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", // USDT (Base Sepolia)
    seller: "0xseller123...",
    amount: parseUnits("500", 18),       // 500 USDT
    maturityTimeDays: 14n,               // Auto-release after 14 days
    arbiter: "0xarbiter456...",          // Optional dispute resolver
    title: "MacBook Pro M3 Max - New",
    ipfsHash: "QmXyz...",                // Description on IPFS
  });

  console.log("Escrow created and funded!");
  console.log("Escrow ID:", result.escrowId.toString());
  console.log("Tx:", result.txHash);
  console.log("Wallet:", result.walletAddress);

  // Next: Seller should call acceptEscrow()
  // Then: Seller delivers, buyer confirms

} catch (error: any) {
  if (error.code === "INSUFFICIENT_BALANCE") {
    alert("Not enough tokens in your wallet");
  } else if (error.code === "VALIDATION_ERROR") {
    alert(error.message);
  } else {
    console.error("Failed:", error.shortMessage || error.message);
  }
}
```

#### Flow Comparison

| createEscrow (Seller) | createEscrowAndDeposit (Buyer) |
|-----------------------|--------------------------------|
| Seller creates | Buyer creates + deposits |
| State: AWAITING_PAYMENT | State: AWAITING_DELIVERY |
| Buyer must deposit later | Already funded |
| Seller signature included | Seller must accept later |

#### Token Approval

The SDK automatically handles token approval:
1. Checks current allowance
2. Approves if needed (may show wallet popup)
3. Creates escrow and deposits

No manual approval required!

#### Validation

The SDK validates:
- Token address is valid ERC20
- Seller address is valid
- Arbiter is not buyer or seller
- Amount > 0
- Title is 1-256 characters
- Sufficient token balance

**See also** → [`createEscrow()`](/docs/create-escrow) · [`acceptEscrow()`](/docs/accept-escrow) · [`deposit()`](/docs/deposit)
