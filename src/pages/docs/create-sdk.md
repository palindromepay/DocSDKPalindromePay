---
title: Create Palindrome SDK
description: "Palindrome Crypto Pay: Initialize Apollo Client, Public Client, and create the PalindromePaySDK instance for blockchain interactions."
---

Before you can use any of the SDK functions, you need to properly initialize and configure the required clients.

The SDK supports both **production** (Base mainnet) and **testnet** (Base Sepolia) environments via the `testnet` parameter.

## Setup & Initialization


Public Client (on-chain reads)
```ts
// config/viem.ts
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';           // Production
// import { baseSepolia } from 'viem/chains'; // Testnet

export const publicClient = createPublicClient({
  chain: base,           // Production
  // chain: baseSepolia, // Testnet
  transport: http(),
});
```

SDK Factory
```ts
// lib/createSDK.ts
import { PalindromePaySDK } from '@palindromepay/sdk';
import { WalletClient } from 'viem';
import { publicClient } from '@/config/viem';
import { apolloClient } from '@/config/apollo';

export const createPalindromeSDK = (walletClient?: WalletClient) => {
  return new PalindromePaySDK({
    publicClient,
    walletClient: walletClient ?? undefined,
    apolloClient,
    // testnet: true, // Enable for Base Sepolia testnet
  });
};
```

Connect Wallet & Instantiate SDK
```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { createWalletClient, custom } from 'viem';
import { base } from 'viem/chains';           // Production
// import { baseSepolia } from 'viem/chains'; // Testnet

export const connectAndInitSDK = async () => {
  if (!window.ethereum) throw new Error('MetaMask not detected');

  const walletClient = createWalletClient({
    chain: base,           // Production
    // chain: baseSepolia, // Testnet
    transport: custom(window.ethereum),
  });

  const [address] = await walletClient.requestAddresses();
  await walletClient.switchChain({ id: base.id });

  const sdk = createPalindromeSDK(walletClient);

  console.log('Palindrome SDK ready for:', address);
  return { sdk, address, walletClient };
};
```

#### Testnet vs Production

| | Production (default) | Testnet |
|---|---|---|
| Chain | Base | Base Sepolia |
| SDK param | `testnet: false` | `testnet: true` |

You can now call any SDK method:
```ts
const escrows = await sdk.getEscrows();
const escrow = await sdk.getEscrowByIdParsed(5n);
await sdk.deposit(walletClient, 5n);
```

#### Pro Tip
You can set up your own database to manage the data independently. While The Graph specializes in indexing blockchain events and providing efficient querying, managing your own database gives you full control over data structure, storage, and custom queries.