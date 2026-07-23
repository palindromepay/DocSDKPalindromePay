---
title: Create Palindrome SDK
description: "Palindrome Crypto Pay: Initialize Apollo Client, Public Client, and create the PalindromePaySDK instance for blockchain interactions."
---

Before you can use any of the SDK functions, you need to properly initialize and configure the required clients.

These docs target `@palindromepay/sdk` **v3.x** (currently 3.0.4). Earlier SDK versions use different signatures — see the SDK README changelog if you are migrating.

The SDK supports both **production** (Base mainnet) and **testnet** (Base Sepolia) environments via the `testnet` parameter.

## Setup & Initialization

Public Client (on-chain reads)
```ts
// config/viem.ts
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains'; // Testnet
// import { base } from 'viem/chains';     // Production

export const publicClient = createPublicClient({
  chain: baseSepolia, // Testnet
  // chain: base,     // Production
  transport: http(),
});
```

SDK Factory & Wallet Connection
```ts
// lib/createSDK.ts
import { PalindromePaySDK } from '@palindromepay/sdk';
import { createWalletClient, custom, WalletClient } from 'viem';
import { baseSepolia } from 'viem/chains'; // Testnet
// import { base } from 'viem/chains';     // Production
import { publicClient } from '@/config/viem';
import { apolloClient } from '@/config/apollo';

export const createPalindromeSDK = (walletClient?: WalletClient) => {
  return new PalindromePaySDK({
    publicClient,
    walletClient: walletClient ?? undefined,
    apolloClient, // required — the SDK throws without it
    testnet: true, // Base Sepolia; set to false for Base mainnet
  });
};

export const connectAndInitSDK = async () => {
  if (!window.ethereum) throw new Error('MetaMask not detected');

  const walletClient = createWalletClient({
    chain: baseSepolia, // Testnet
    // chain: base,     // Production
    transport: custom(window.ethereum),
  });

  const [address] = await walletClient.requestAddresses();
  await walletClient.switchChain({ id: baseSepolia.id });

  const sdk = createPalindromeSDK(walletClient);

  console.log('Palindrome SDK ready for:', address);
  return { sdk, address, walletClient };
};
```

Every code example in these docs uses this setup:
```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk, walletClient } = await connectAndInitSDK();
```

#### Testnet vs Production

| | Testnet | Production |
|---|---|---|
| Chain | Base Sepolia (chainId `84532`) | Base (chainId `8453`) |
| SDK param | `testnet: true` | `testnet: false` (default) |
| Escrow contract | `0x84786faacb03eb2972c691af6c7ec78d0d75b439` | Set automatically by the SDK |

#### Configuration options

`publicClient` and `apolloClient` are required; everything else is optional.

| Option | Type | Default | Description |
|---|---|---|---|
| `publicClient` | `PublicClient` | — (required) | viem client for on-chain reads |
| `apolloClient` | `ApolloClient` | — (required) | Apollo client for subgraph queries; the constructor throws without it |
| `walletClient` | `WalletClient` | `undefined` | Default wallet for write operations (can also be passed per call) |
| `chain` | `Chain` | `hardhat` | viem chain object; usually set implicitly via `testnet` |
| `testnet` | `boolean` | `false` | `true` = Base Sepolia, `false` = Base mainnet |
| `cacheTTL` | `number` | `5000` | Escrow cache time-to-live in ms |
| `maxCacheSize` | `number` | `1000` | Max entries in the LRU escrow cache |
| `enableRetry` | `boolean` | `true` | Retry failed contract reads |
| `maxRetries` | `number` | `3` | Retry attempts per read |
| `retryDelay` | `number` | `1000` | Delay between retries in ms |
| `gasBuffer` | `number` | `20` | Percent added on top of gas estimates |
| `receiptTimeout` | `number` | `60000` | How long to wait for transaction receipts in ms |
| `skipSimulation` | `boolean` | `false` | Skip pre-flight `simulateContract` calls |
| `defaultGasLimit` | `bigint` | `500000n` | Fallback gas limit when estimation fails |
| `logger` | `SDKLogger` | console | Custom logger implementation |
| `logLevel` | `LogLevel` | — | Minimum log level |

{% callout title="Escrow ID types: bigint vs string" %}
On-chain methods (`deposit`, `confirmDelivery`, `getEscrowByIdParsed`, …) take `escrowId` as a **`bigint`** (e.g. `42n`). Subgraph queries (`getEscrowDetail`, `getDisputeMessages`, …) take it as a **`string`** (e.g. `"42"`), since The Graph returns IDs as strings.
{% /callout %}

You can now call any SDK method:
```ts
const escrows = await sdk.getEscrows();
const escrow = await sdk.getEscrowByIdParsed(5n);
await sdk.deposit(walletClient, 5n);
```

#### Pro Tip
You can set up your own database to manage the data independently. While The Graph specializes in indexing blockchain events and providing efficient querying, managing your own database gives you full control over data structure, storage, and custom queries.
