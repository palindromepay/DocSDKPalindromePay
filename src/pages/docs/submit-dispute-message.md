---
title: submitDisputeMessage
description: "Palindrome Crypto Pay: Submit evidence or message during an active dispute. Both buyer and seller can provide proof for arbiter review."
---

```ts
async submitDisputeMessage(
  walletClient: WalletClient,
  escrowId: bigint,
  role: Role,
  ipfsHash: string
): Promise<Hex>
```

Allows **buyer**, **seller**, or **arbiter** to upload evidence (chat logs, screenshots, tracking numbers, videos, etc.) to IPFS and attach it to the ongoing dispute.

Each participant can submit **only once**.

#### Parameters
- `walletClient: WalletClient` – Your connected wallet (must match the role)
- `escrowId: bigint` – The disputed escrow ID
- `role: Role` – Must be `Role.Buyer`, `Role.Seller`, or `Role.Arbiter`
- `ipfsHash: string` – IPFS CID of your evidence (e.g. `"QmXyZ123..."`)

#### Returns
`Promise<Hex>` – Transaction hash

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { Role } from '@palindromepay/sdk';

const { sdk, walletClient } = await connectAndInitSDK(); // walletClient = buyer or seller

try {
  const txHash = await sdk.submitDisputeMessage(
    walletClient,
    42n,
    Role.Buyer,                    // or Role.Seller / Role.Arbiter
    "QmXyZ123...your-evidence-hash"
  );

  console.log("Evidence submitted successfully!");
  console.log("Transaction:", txHash);

} catch (error: any) {
  if (error.code === "EVIDENCE_ALREADY_SUBMITTED") {
    alert("You have already submitted evidence");
  } else if (error.code === "INVALID_STATE") {
    alert("Escrow is not in DISPUTED state");
  } else {
    console.error("Submit failed:", error.shortMessage || error.message);
  }
}
```

#### Best Practices
- Upload a **JSON file** to IPFS containing:
  ```json
  {
    "message": "I never received the item. Here are screenshots of our chat...",
    "screenshots": ["ipfs://...", "ipfs://..."],
    "trackingNumber": "1Z999AA1234567890"
  }
  ```
- Use Pinata, nft.storage, or web3.storage for reliable pinning

**After all parties submit** → Arbiter reviews and calls [`submitArbiterDecision()`](/docs/submit-arbiter-decision)
