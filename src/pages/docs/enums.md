---
id: enums
title: Enums & Types
sidebar_label: Enums
---

This page documents all TypeScript enums and key interfaces used in the Palindrome Escrow SDK.

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

Arbiter decision outcomes. Used in `submitArbiterDecision`.

| Value | Name       | Description                     |
|-------|------------|---------------------------------|
| 3     | Complete   | Release funds to seller         |
| 4     | Refunded   | Return funds to buyer           |