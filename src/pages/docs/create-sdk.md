---
title: Create Palindrome SDK
description: Initialize Apollo Client, Public Client, and create the PalindromeEscrowSDK instance
---

Before you can use any of the SDK functions, you need to properly initialize and configure the required clients.

## Setup & Initialization

#### Apollo Client (Subgraph queries)

```ts
// config/apollo.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const SUBGRAPH_URL =
  process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
  'https://api.thegraph.com/subgraphs/name/yourname/palindrome-bsc-testnet';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: SUBGRAPH_URL }),
  cache: new InMemoryCache(),
});
```

Public Client (on-chain reads)
```ts
// config/viem.ts
import { createPublicClient, http } from 'viem';
import { bscTestnet } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});
```

SDK Factory
```ts
// lib/createSDK.ts
import { PalindromeEscrowSDK } from '@palindromecryptoescrow/sdk';
import { WalletClient } from 'viem';
import { publicClient } from '@/config/viem';
import { apolloClient } from '@/config/apollo';
import { bscTestnet } from 'viem/chains';

export const createPalindromeSDK = (walletClient?: WalletClient) => {
  return new PalindromeEscrowSDK({
    publicClient,
    walletClient: walletClient ?? undefined,
    chain: bscTestnet,
    apollo: apolloClient,
  });
};
```

Connect Wallet & Instantiate SDK
```ts
import { createPalindromeSDK } from '@/lib/createSDK';
import { createWalletClient, custom } from 'viem';
import { bscTestnet } from 'viem/chains';

export const connectAndInitSDK = async () => {
  if (!window.ethereum) throw new Error('MetaMask not detected');

  const walletClient = createWalletClient({
    chain: bscTestnet,
    transport: custom(window.ethereum),
  });

  const [address] = await walletClient.requestAddresses();
  await walletClient.switchChain({ id: bscTestnet.id });

  const sdk = createPalindromeSDK(walletClient);

  console.log('Palindrome SDK ready for:', address);
  return { sdk, address, walletClient };
};
```

You can now call any SDK method:
```ts
const escrows = await sdk.getEscrows();
const escrow = await sdk.getEscrowByIdParsed(5n);
await sdk.deposit(walletClient, 5n);```

