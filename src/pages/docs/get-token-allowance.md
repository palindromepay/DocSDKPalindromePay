---
title: getTokenAllowance
description: "Palindrome Crypto Pay: Check how much token spending is approved for a spender address. Verify allowances before escrow operations."
---

```ts
async getTokenAllowance(
  owner: Address,
  spender: Address,
  tokenAddress: Address
): Promise<bigint>
```

Reads the ERC20 `allowance()` to check how much a spender is approved to transfer on behalf of the owner.

#### Parameters
- `owner: Address` – The token holder's address
- `spender: Address` – The address approved to spend (usually the escrow contract)
- `tokenAddress: Address` – The ERC20 token contract address

#### Returns
`Promise<bigint>` – The approved amount (in token's smallest unit)

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();

const USDT = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // Base Sepolia USDT
const escrowContract = sdk.contractAddress;

// Check current allowance
const allowance = await sdk.getTokenAllowance(
  walletClient.account.address,  // owner (your wallet)
  escrowContract,                 // spender (escrow contract)
  USDT                            // token
);

console.log("Current allowance:", allowance);

// Format for display
const decimals = await sdk.getTokenDecimals(USDT);
const formatted = sdk.formatTokenAmount(allowance, decimals);
console.log("Allowance:", formatted, "USDT");
```

#### Check Before Deposit

```ts
async function checkDepositReady(escrowId: bigint) {
  const escrow = await sdk.getEscrowByIdParsed(escrowId);

  const allowance = await sdk.getTokenAllowance(
    walletClient.account.address,
    sdk.contractAddress,
    escrow.token
  );

  if (allowance >= escrow.amount) {
    console.log("Ready to deposit — approval sufficient");
    return true;
  } else {
    console.log("Need to approve more tokens");
    const needed = escrow.amount - allowance;
    console.log("Additional approval needed:", needed);
    return false;
  }
}
```

#### UI Pattern: Show Approval Status

```tsx
function ApprovalStatus({ token, amount }: { token: Address; amount: bigint }) {
  const [allowance, setAllowance] = useState<bigint>(0n);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sdk.getTokenAllowance(userAddress, sdk.contractAddress, token)
      .then(setAllowance)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <span>Checking approval...</span>;

  const isApproved = allowance >= amount;

  return isApproved ? (
    <span className="text-green-500">Approved</span>
  ) : (
    <button onClick={() => approve(token, amount)}>
      Approve {formatAmount(amount - allowance)} more
    </button>
  );
}
```

#### Unlimited Approval Check

```ts
const MAX_UINT256 = 2n ** 256n - 1n;

const allowance = await sdk.getTokenAllowance(owner, spender, token);

if (allowance === MAX_UINT256) {
  console.log("Unlimited approval granted");
} else {
  console.log("Limited approval:", allowance);
}
```

**See also** → [`approveTokenIfNeeded()`](/docs/approve-token-if-needed) · [`getTokenBalance()`](/docs/get-token-balance)
