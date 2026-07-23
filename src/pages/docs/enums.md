---
title: Enums & Types
description: "Palindrome Crypto Pay: All TypeScript enums, types, and key interfaces used in the PalindromePay SDK."
---

This page documents all TypeScript enums and key interfaces used in the Palindrome Pay SDK. All of them are exported from `@palindromepay/sdk`.

---

## EscrowState

Represents the current lifecycle state of an escrow. Used in `EscrowData.state` and state-checking methods.

| Value | Name               | Label              | Description                                      |
|-------|--------------------|--------------------|--------------------------------------------------|
| 0     | AWAITING_PAYMENT   | Awaiting Payment   | Buyer must deposit funds.                        |
| 1     | AWAITING_DELIVERY  | Awaiting Delivery  | Seller must deliver product/service.             |
| 2     | DISPUTED           | Disputed           | Dispute active — arbiter to resolve.             |
| 3     | COMPLETE           | Complete           | Transaction successfully finalized.              |
| 4     | REFUNDED           | Refunded           | Funds returned to buyer.                         |
| 5     | CANCELED           | Canceled           | Escrow canceled by mutual agreement or timeout.  |

---

## PayoutOutcome

A type alias (not a separate enum) covering the three **terminal** escrow states a payout authorization can consent to. Used by [`signWalletAuthorization()`](/docs/sign-wallet-authorization) and `getWalletSignatureCount()`.

```ts
type PayoutOutcome =
  | EscrowState.COMPLETE   // 3 — release funds to seller
  | EscrowState.REFUNDED   // 4 — return funds to buyer
  | EscrowState.CANCELED;  // 5 — cancel and return funds
```

Since Multisig v2, every wallet authorization is bound to exactly one of these outcomes, so a signature collected for one outcome cannot be replayed for another.

---

## Role

Defines participant roles in the escrow. Used in `submitDisputeMessage`.

| Value | Name      | Description           |
|-------|-----------|-----------------------|
| 0     | None      | No role               |
| 1     | Buyer     | Escrow buyer          |
| 2     | Seller    | Escrow seller         |
| 3     | Arbiter   | Dispute arbitrator    |

---

## DisputeResolution

Arbiter decision outcomes. Used in `submitArbiterDecision`. The values intentionally mirror the corresponding `EscrowState` values (which is why they start at 3, not 0).

| Value | Name       | Description                     |
|-------|------------|---------------------------------|
| 3     | Complete   | Release funds to seller         |
| 4     | Refunded   | Return funds to buyer           |

---

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `MAX_ARBITER_FEE_BPS` | `2000` | Maximum arbiter fee in basis points (= 20%) |

---

## CreateEscrowParams

Used by [`createEscrow()`](/docs/create-escrow). `CreateEscrowAndDepositParams` is identical except it takes `seller` instead of `buyer`.

```ts
interface CreateEscrowParams {
  token: Address;
  buyer: Address;
  amount: bigint;
  maturityTimeDays?: bigint;  // 0 = no auto-release
  arbiter?: Address;          // default: zero address (no arbiter)
  arbiterFeeBps?: number;     // 0-2000 bps; must be 0 without an arbiter
  title: string;              // 1-256 chars
  ipfsHash?: string;
}
```

---

## SetArbiterSignedParams

Used by [`setArbiterSigned()`](/docs/set-arbiter-signed) to assign an arbiter to an arbiterless escrow with buyer and seller consent.

```ts
interface SetArbiterSignedParams {
  escrowId: bigint;
  newArbiter: Address;
  arbiterFeeBps: number;  // 0-2000 bps
  buyerSig: Hex;
  sellerSig: Hex;
  deadline: bigint;
  nonce: bigint;          // shared nonce, consumed for BOTH signers
}
```

---

## EscrowData

Parsed on-chain escrow data returned by [`getEscrowByIdParsed()`](/docs/get-escrow-by-id-parsed).

```ts
interface EscrowData {
  token: Address;
  buyer: Address;
  seller: Address;
  arbiter: Address;
  wallet: Address;             // the escrow's dedicated multisig wallet
  amount: bigint;
  depositTime: bigint;
  maturityTime: bigint;
  maturityDuration: bigint;    // maturity window in seconds
  disputeStartTime: bigint;
  state: EscrowState;
  buyerCancelRequested: boolean;
  sellerCancelRequested: boolean;
  tokenDecimals: number;
  arbiterFeeBps: number;       // 0-2000 bps
  sellerWalletSig: Hex;
  buyerWalletSig: Hex;
  arbiterWalletSig: Hex;
}
```

{% callout title="Escrow ID types: bigint vs string" %}
On-chain methods take `escrowId` as a **`bigint`** (e.g. `42n`). Subgraph queries (`getEscrowDetail`, `getDisputeMessages`, …) take it as a **`string`** (e.g. `"42"`), since The Graph returns IDs as strings.
{% /callout %}

**See also** → [Create Palindrome SDK](/docs/create-sdk) · [`createEscrow()`](/docs/create-escrow) · [`signWalletAuthorization()`](/docs/sign-wallet-authorization)
