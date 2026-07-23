---
title: approveTokenIfNeeded
description: "Palindrome Crypto Pay: Approve token spending only if current allowance is insufficient. Smart approval handling for UX."
---

```ts
async approveTokenIfNeeded(
  walletClient: WalletClient,
  token: Address,
  spender: Address,
  amount: bigint
): Promise<Hex | null>
```

Checks the current token allowance and only sends an approval transaction if needed. Returns `null` if approval is already sufficient.

This is used internally by `deposit()` and `createEscrowAndDeposit()`, but you can call it manually for custom flows.

#### Parameters
- `walletClient: WalletClient` – The token owner's wallet
- `token: Address` – The ERC20 token contract address
- `spender: Address` – The address to approve (usually escrow contract)
- `amount: bigint` – The required approval amount

#### Returns
`Promise<Hex | null>` – Transaction hash if approval was sent, `null` if already approved

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const USDT = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // Base Sepolia USDT
const amount = 1000000000000000000000n; // 1000 USDT

// Approve if needed
const txHash = await sdk.approveTokenIfNeeded(
  walletClient,
  USDT,
  sdk.contractAddress,
  amount
);

if (txHash) {
  console.log("Approval sent:", txHash);
} else {
  console.log("Already approved — no transaction needed");
}
```

#### How It Works

```ts
// Pseudocode of internal logic:
async function approveTokenIfNeeded(wallet, token, spender, amount) {
  const currentAllowance = await getTokenAllowance(wallet.address, spender, token);

  if (currentAllowance >= amount) {
    return null; // Already approved enough
  }

  // Send approval transaction
  const hash = await wallet.writeContract({
    address: token,
    functionName: "approve",
    args: [spender, amount],
  });

  await waitForReceipt(hash);
  return hash;
}
```

#### With USDT Pattern

USDT on some chains requires resetting allowance to 0 before setting a new value:

```ts
// For tokens that require reset (like USDT on Ethereum mainnet)
async function approveWithReset(wallet, token, spender, amount) {
  const current = await sdk.getTokenAllowance(wallet.address, spender, token);

  // If current > 0 and < amount, reset first
  if (current > 0n && current < amount) {
    await wallet.writeContract({
      address: token,
      functionName: "approve",
      args: [spender, 0n],
    });
  }

  // Now approve the new amount
  return await sdk.approveTokenIfNeeded(wallet, token, spender, amount);
}
```

#### UI Pattern

```tsx
function DepositButton({ escrowId }: { escrowId: bigint }) {
  const [approving, setApproving] = useState(false);
  const [depositing, setDepositing] = useState(false);

  const handleDeposit = async () => {
    const escrow = await sdk.getEscrowByIdParsed(escrowId);

    // Step 1: Approve if needed
    setApproving(true);
    const approveTx = await sdk.approveTokenIfNeeded(
      walletClient,
      escrow.token,
      sdk.contractAddress,
      escrow.amount
    );
    if (approveTx) {
      console.log("Approved:", approveTx);
    }
    setApproving(false);

    // Step 2: Deposit
    setDepositing(true);
    const depositTx = await sdk.deposit(walletClient, escrowId);
    console.log("Deposited:", depositTx);
    setDepositing(false);
  };

  return (
    <button onClick={handleDeposit} disabled={approving || depositing}>
      {approving ? "Approving..." : depositing ? "Depositing..." : "Deposit"}
    </button>
  );
}
```

**See also** → [`getTokenAllowance()`](/docs/get-token-allowance) · [`deposit()`](/docs/deposit)
