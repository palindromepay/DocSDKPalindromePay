---
title: getTokenDecimals
description: "Palindrome Crypto Pay: Get the decimal places for any ERC20 token. Essential for formatting token amounts correctly in your UI."
---

```ts
async getTokenDecimals(tokenAddress: Address): Promise<number>
```

Reads the `decimals()` value from an ERC20 token contract. Results are cached to avoid repeated RPC calls.

#### Parameters
- `tokenAddress: Address` – The ERC20 token contract address

#### Returns
`Promise<number>` – Number of decimal places (usually 18, 6, or 8)

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

// Base Sepolia USDT
const usdtDecimals = await sdk.getTokenDecimals("0x337610d27c682E347C9cD60BD4b3b107C9d34dDd");
console.log("USDT decimals:", usdtDecimals);

// USDC (6 decimals on most chains)
const usdcDecimals = await sdk.getTokenDecimals("0xUSDC_ADDRESS...");
console.log("USDC decimals:", usdcDecimals);
```

#### Common Token Decimals

| Token | Chain | Decimals |
|-------|-------|----------|
| USDT | Base Sepolia | 6 |
| USDT | Ethereum | 6 |
| USDC | Most chains | 6 |
| DAI | Most chains | 18 |
| WBTC | Ethereum | 8 |

#### Formatting Amounts

```ts
const tokenAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // Base Sepolia USDT

// Get decimals
const decimals = await sdk.getTokenDecimals(tokenAddress);

// Get raw balance
const rawBalance = await sdk.getTokenBalance(userAddress, tokenAddress);
// e.g., 1250000000000000000000n (raw)

// Format for display
const formatted = sdk.formatTokenAmount(rawBalance, decimals);
console.log("Balance:", formatted); // "1250.00"
```

#### Parsing User Input

```ts
import { parseUnits } from 'viem';

const tokenAddress = "0x...";
const decimals = await sdk.getTokenDecimals(tokenAddress);

// User enters "100.50"
const userInput = "100.50";
const amount = parseUnits(userInput, decimals);
console.log("Amount in wei:", amount); // 100500000000000000000n (for 18 decimals)
```

#### Caching Behavior

Token decimals are cached permanently (they never change):

```ts
// First call: makes RPC request
const decimals1 = await sdk.getTokenDecimals(token);

// Second call: returns cached value instantly
const decimals2 = await sdk.getTokenDecimals(token);
```

**See also** → [`getTokenBalance()`](/docs/get-token-balance) · [`formatTokenAmount()`](/docs/format-token-amount)
