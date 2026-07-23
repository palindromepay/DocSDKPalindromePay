---
title: autoRelease
description: "Palindrome Crypto Pay: Automatically release funds to seller after maturity time has passed. Protects sellers from unresponsive buyers."
---

```ts
async autoRelease(walletClient: WalletClient, escrowId: bigint): Promise<Hex>
```

**Anyone** can call this function once the escrow's maturity time has passed. This releases funds to the seller automatically without requiring buyer confirmation.

Perfect for deals with a delivery deadline — if the buyer doesn't confirm or dispute within the maturity period, the seller automatically gets paid.

#### Parameters
- `walletClient: WalletClient` – Any wallet (buyer, seller, relayer, or bot)
- `escrowId: bigint` – The escrow ID

#### Returns
`Promise<Hex>` – Transaction hash

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { EscrowState } from '@palindromepay/sdk';

const { sdk, walletClient } = await connectAndInitSDK();

try {
  const txHash = await sdk.autoRelease(walletClient, 42n);

  console.log("Auto-release successful!");
  console.log("Funds released to seller");
  console.log("Transaction:", txHash);

  // Escrow state → COMPLETE
  // Seller can now withdraw funds

} catch (error: any) {
  if (error.message.includes("Maturity time not reached")) {
    alert("Maturity deadline has not passed yet");
  } else if (error.message.includes("Invalid state")) {
    alert("Escrow is not in AWAITING_DELIVERY state");
  } else {
    console.error("Auto-release failed:", error.shortMessage || error.message);
  }
}
```

#### Requirements

For `autoRelease()` to succeed:
- Escrow must be in `AWAITING_DELIVERY` state
- `maturityTime` must be set (> 0)
- Current block timestamp must be past `maturityTime`
- No active dispute

#### Example: Checking Before Auto-Release

```ts
const escrow = await sdk.getEscrowByIdParsed(42n);

const now = Math.floor(Date.now() / 1000);
const canAutoRelease =
  escrow.state === EscrowState.AWAITING_DELIVERY &&
  escrow.maturityTime > 0n &&
  BigInt(now) >= escrow.maturityTime;

if (canAutoRelease) {
  await sdk.autoRelease(walletClient, 42n);
}
```

#### Use Cases

- **Seller protection** – Ensures payment even if buyer goes silent
- **Automated bots** – Can monitor and trigger auto-release for multiple escrows
- **Time-limited deals** – "Pay within 7 days or seller gets paid automatically"

**See also** → [`createEscrow()`](/docs/create-escrow) · [`getEscrowByIdParsed()`](/docs/get-escrow-by-id-parsed)
