---
title: setArbiterSigned
description: "Palindrome Crypto Pay: Assign an arbiter to an arbiterless escrow with buyer and seller consent via EIP-712 signatures."
---

```ts
async setArbiterSigned(
  walletClient: WalletClient,
  params: SetArbiterSignedParams
): Promise<Hex>
```

Assigns an arbiter to an escrow that was created **without** one, using mutual consent: both buyer and seller sign the same `SetArbiter` struct via [`signSetArbiter()`](/docs/sign-set-arbiter), then **anyone** may submit the transaction.

The arbiter can be set **once** — swapping an existing arbiter is not possible.

#### Parameters

```ts
interface SetArbiterSignedParams {
  escrowId: bigint;
  newArbiter: Address;
  arbiterFeeBps: number;  // 0-2000 bps (max 20%)
  buyerSig: Hex;          // buyer's signSetArbiter() signature
  sellerSig: Hex;         // seller's signSetArbiter() signature
  deadline: bigint;       // same deadline both parties signed
  nonce: bigint;          // shared nonce, consumed for BOTH signers
}
```

#### Returns
`Promise<Hex>` – Transaction hash

#### Constraints
- No arbiter set yet on the escrow
- Escrow state is `AWAITING_PAYMENT` or `AWAITING_DELIVERY`
- `newArbiter` is not the buyer, seller, or fee receiver, and must be an EOA
- `arbiterFeeBps` is an integer between 0 and 2000
- `deadline` is in the future, at most **1 day** out (contract rule)
- The shared `nonce` is unused for **both** buyer and seller

#### Full two-signer flow

```ts
import { connectAndInitSDK } from '@/lib/createSDK';

const { sdk } = await connectAndInitSDK();

const escrowId = 42n;
const newArbiter = "0xarbiter456...";
const arbiterFeeBps = 250; // 2.5%

// Agree on a shared deadline and nonce (e.g. coordinated via your backend)
const deadline = await sdk.createSignatureDeadline(60);
const nonce = await sdk.getUserNonce(escrowId, buyerAddress);

// 1. Buyer signs
const buyerSig = await sdk.signSetArbiter(
  buyerWalletClient, escrowId, newArbiter, arbiterFeeBps, deadline, nonce
);

// 2. Seller signs the identical struct
const sellerSig = await sdk.signSetArbiter(
  sellerWalletClient, escrowId, newArbiter, arbiterFeeBps, deadline, nonce
);

// 3. Anyone submits
try {
  const txHash = await sdk.setArbiterSigned(anyWalletClient, {
    escrowId,
    newArbiter,
    arbiterFeeBps,
    buyerSig,
    sellerSig,
    deadline,
    nonce,
  });

  console.log("Arbiter assigned:", txHash);

} catch (error: any) {
  if (error.code === "INVALID_STATE") {
    alert("Arbiter already set, or escrow is disputed/finished");
  } else if (error.code === "VALIDATION_ERROR") {
    alert(error.message); // arbiter/fee/deadline/nonce constraint violated
  } else if (error.code === "SIGNATURE_EXPIRED") {
    alert("Deadline passed — both parties must sign again");
  } else {
    console.error("Failed:", error.shortMessage || error.message);
  }
}
```

**See also** → [`signSetArbiter()`](/docs/sign-set-arbiter) · [`createEscrow()`](/docs/create-escrow) · [Enums & Types](/docs/enums)
