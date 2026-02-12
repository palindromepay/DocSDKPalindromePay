---
title: getTokenBalance
description: "Palindrome Crypto Pay: Get the ERC20 token balance of any address. Check USDT or other supported token balances before transactions."
---

```ts
async getTokenBalance(
  account: Address,
  tokenAddress: Address
): Promise<bigint>
```

Reads the **raw token balance** (in wei-like units) of any wallet or contract for any ERC20 token (USDT, USDC, etc.).

Useful for checking buyer funds before deposit, seller payouts, or escrow contract balance.

#### Parameters
- `account: Address` – The wallet or contract to check (e.g. buyer, seller, escrow contract)
- `tokenAddress: Address` – The ERC20 token contract address

#### Returns
`Promise<bigint>` – Balance as bigint (e.g. `1250000000000000000000n` for tokens with 18 decimals)

```ts
import { createPalindromeSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();
const USDT_ADDRESS = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // Base Sepolia USDT

try {
  // Check buyer's USDT balance
  const buyerBalance = await sdk.getTokenBalance(
    "0xbuyer123...",
    USDT_ADDRESS
  );
  
  // Get token decimals and format for display
  const decimals = await sdk.getTokenDecimals(USDT_ADDRESS);
  const formatted = sdk.formatTokenAmount(buyerBalance, decimals);
  console.log("Buyer USDT:", formatted);

  // Check how much is currently in the escrow contract
  const escrowBalance = await sdk.getTokenBalance(
    "0xYourEscrowContractAddress...",
    USDT_ADDRESS
  );
  console.log("Escrow holds:", sdk.formatTokenAmount(escrowBalance, decimals));

  // Works with any ERC20 token
  const usdcBalance = await sdk.getTokenBalance(
    "0xbuyer123...",
    "0xUSDC_ADDRESS..."
  );
  const usdcDecimals = await sdk.getTokenDecimals("0xUSDC_ADDRESS...");
  console.log("Buyer USDC:", sdk.formatTokenAmount(usdcBalance, usdcDecimals));

} catch (error) {
  console.error("Failed to read balance:", error);
}
```

#### Common Use Cases
- Show "Available Balance" before deposit
- Display "Funds Locked" in escrow
- Debug token flow
- Build wallet dashboards
- Multi-token support (USDT, USDC, DAI, etc.)

#### Helper Methods

Combine with these SDK methods for better UX:

```ts
// Format individual balances
const decimals = await sdk.getTokenDecimals(tokenAddress);
const readable = sdk.formatTokenAmount(balance, decimals);
```

#### Error Handling

The method throws `SDKError` with code `INVALIDTOKEN` if:
- Token address is not a valid ERC20 contract
- Token doesn't implement `balanceOf()`
- Network request fails

```ts
try {
  const balance = await sdk.getTokenBalance(account, token);
} catch (error: any) {
  if (error.code === "INVALIDTOKEN") {
    console.error("Invalid token contract");
  } else if (error.code === "RPC_ERROR") {
    console.error("Network error - retry");
  }
}
```

**Fast, reliable, on-chain balance reading – no subgraph delay**

**See also** → [`formatTokenAmount()`](/docs/format-token-amount) · [`getTokenDecimals()`](/docs/get-token-decimals) · [`getTokenAllowance()`](/docs/get-token-allowance)