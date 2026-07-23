---
title: hasSubmittedEvidence
description: "Palindrome Crypto Pay: Check if a specific role (buyer, seller, arbiter) has already submitted evidence in an active dispute."
---

```ts
async hasSubmittedEvidence(escrowId: bigint, role: Role): Promise<boolean>
```

Checks if a specific participant (buyer, seller, or arbiter) has submitted evidence for a disputed escrow. Each participant can submit evidence **only once**, so use this to guard your UI before calling [`submitDisputeMessage()`](/docs/submit-dispute-message).

#### Parameters
- `escrowId: bigint` – The escrow ID to check
- `role: Role` – The role to check: `Role.Buyer`, `Role.Seller`, or `Role.Arbiter`

#### Returns
`Promise<boolean>` – `true` if the specified role has submitted evidence, `false` otherwise

```ts
import { connectAndInitSDK } from '@/lib/createSDK';
import { Role } from '@palindromepay/sdk';

const { sdk } = await connectAndInitSDK();

const hasSubmitted = await sdk.hasSubmittedEvidence(42n, Role.Buyer);

if (hasSubmitted) {
  console.log('Buyer has already submitted evidence');
} else {
  console.log('Buyer has not submitted evidence yet');
}
```

#### Check all participants

```ts
const [buyerSubmitted, sellerSubmitted, arbiterSubmitted] = await Promise.all([
  sdk.hasSubmittedEvidence(42n, Role.Buyer),
  sdk.hasSubmittedEvidence(42n, Role.Seller),
  sdk.hasSubmittedEvidence(42n, Role.Arbiter),
]);

console.log('Buyer submitted:', buyerSubmitted);
console.log('Seller submitted:', sellerSubmitted);
console.log('Arbiter submitted:', arbiterSubmitted);
```

**See also** → [`getDisputeSubmissionStatus()`](/docs/get-dispute-submission-status) · [`submitDisputeMessage()`](/docs/submit-dispute-message)
