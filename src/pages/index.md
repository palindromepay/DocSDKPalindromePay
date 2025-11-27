---
title: Getting started
pageTitle: Palindrome - Decentralized Crypto Pay Documentation.
description: Palindrome Finance is a crypto payment system with escrow service focused on secure cryptocurrency transactions, providing solutions that enhance trust and protection in digital payments. Palindrome Finance offers an SDK that can be integrated into e-commerce stores, real estate platforms, and various booking systems, allowing users to add crypto-based escrow payments seamlessly to their existing workflows. This enables businesses to benefit from secure, transparent transactions for a wide range of use cases, including online shopping, property rentals, and hotel booking system.
---

Learn how to get Palindrome Crypto Payment SDK set up. This SDK provides TypeScript utilities for interacting with Palindrome Payment System contracts on BSC (Binance Smart Chain) testnet, querying escrow data via The Graph/Apollo, and handling USDT token operations. It is suitable for full-stack dApps needing escrow service. {% .lead %}

{% quick-links %}

{% quick-link title="Quick Start" icon="installation" href="#quick-start" description="Step-by-step guides to setting up your system and installing the library." /%}


{% /quick-links %}

---

## Quick start

Do you want to start right away? Then install Palindrome Crypto Pay with a command line.

### Installing dependencies

The SDK is written in **TypeScript** and can be imported into React, Vue and Angular application.

```typescript
npm install @palindromecryptoescrow/sdk
```

{% callout title="You should do!" %}
  Create a .env file

```js
REACT_APP_USDT_TOKEN=0x337610d27c682E347C9cD60BD4b3b107C9d34dDd //this is USDT Faucet on BSC-Testnet 
```
{% /callout %}

---

