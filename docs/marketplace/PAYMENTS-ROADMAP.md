# MyZubster Payments Roadmap

Status: **public product roadmap**  
Last updated: 2026-09-16

## Goal

MyZubster follows a **free-first, payment-later** Marketplace strategy.

People should be able to join, become a basic Seller, publish eligible listings and understand the Marketplace before MyZubster asks for payment or financial onboarding.

Core rule:

> **Seller account != Payment account != Seller Pro != Verified Seller**

A free Seller account does not by itself mean that a Seller is identity-verified, financially onboarded, commercially licensed, endorsed by MyZubster, or ready to receive platform-managed payments.

---

## Phase 1 — Free Marketplace

**Objective:** remove payment friction from Seller onboarding.

Target flow:

```text
Create account
    ↓
Activate SELLER_FREE
    ↓
Create eligible listings
    ↓
Publish
    ↓
Receive Marketplace requests
    ↓
Use messaging / reputation features where available
```

Product rules:

- basic Seller activation costs EUR 0;
- no payment card is required to become a basic Seller;
- no IBAN/bank account is required to become a basic Seller;
- Stripe/payment-provider onboarding is not part of basic Seller activation;
- no recurring Seller subscription is silently created;
- current initial target: up to **5 active commercial listings** under `SELLER_FREE`;
- community/free exchange categories may have separate Marketplace rules;
- reaching the free listing limit does **not** trigger an automatic charge.

**Exit criteria:** a user can complete `account -> SELLER_FREE -> listing -> publish` without entering financial information.

---

## Phase 2 — Marketplace Validation

**Objective:** understand whether Sellers are receiving real value before introducing monetization.

Measure at minimum:

- free Seller activations;
- Sellers reaching 1, 3 and 5 active listings;
- listing publication rate;
- Marketplace requests per listing;
- accepted requests;
- completed exchanges;
- repeat Seller activity;
- Seller retention;
- reports/moderation events;
- demand for additional listing capacity;
- demand for integrated payments.

At the free listing limit, the product should explain the limit clearly. It must not imply that a payment has already been authorized.

Example state:

```text
SELLER_FREE
activeListings: 5/5
paymentConfigured: false
chargeAuthorized: false
```

**Exit criteria:** there is enough real usage evidence to justify building payment onboarding and to understand which transaction categories need it.

---

## Phase 3 — Payment-Ready Architecture

**Objective:** build payments as a separate capability instead of making payments a condition of being a Seller.

Proposed payment states:

```text
PAYMENT_NOT_CONFIGURED
        ↓
PAYMENT_ONBOARDING
        ↓
PAYMENT_REVIEW
        ↓
PAYMENT_READY
        ↓
PAYMENT_RESTRICTED / PAYMENT_DISABLED
```

Requirements:

- keep Seller membership state separate from payment capability;
- store only payment-provider identifiers and operational state needed by MyZubster;
- avoid collecting financial information before it is necessary;
- do not represent `PAYMENT_ONBOARDING` as verified or payment-ready;
- implement auditable webhook/event handling;
- make payment state inspectable by the Seller;
- document refund, dispute, cancellation and payout behavior before production transactions;
- perform category-by-category legal/payment eligibility review.

**Exit criteria:** payment capability can be enabled or disabled independently without removing the Seller's basic Marketplace identity.

---

## Phase 4 — Activate Payments

**Objective:** ask for financial onboarding only when a Seller chooses to use real platform-managed payments.

Target flow:

```text
SELLER_FREE
    ↓
Seller chooses "Activate payments"
    ↓
Payment-provider onboarding
    ↓
Required identity/business/payment checks
    ↓
PAYMENT_READY
```

Rules:

- activation is explicit;
- no automatic conversion from free Seller to a paid subscription;
- MyZubster explains why information is required before sending the Seller to onboarding;
- sensitive payment/verification data should be handled by the selected regulated payment provider wherever possible;
- MyZubster must not claim successful verification until provider evidence confirms the relevant state.

A provider such as Stripe Connect can be evaluated for marketplace payment onboarding, but provider choice and production configuration remain implementation decisions and are not implied merely by this roadmap.

**Exit criteria:** an eligible Seller can intentionally activate payment capability and MyZubster can accurately distinguish onboarding, ready, restricted and disabled states.

---

## Phase 5 — Real Transactions and Marketplace Fees

**Objective:** monetize economic activity rather than charging people simply for experimenting with the Marketplace.

Conceptual flow:

```text
Buyer payment
    ↓
Payment processor
    ↓
Applicable processing costs
    ↓
Clearly disclosed MyZubster marketplace fee (if adopted)
    ↓
Seller balance / payout
```

Before introducing a marketplace commission:

- determine the real payment-processing cost structure;
- analyze transaction sizes and categories;
- disclose the MyZubster fee before confirmation;
- define refunds, disputes and chargebacks;
- define payout timing and restrictions;
- define tax/invoicing responsibilities with qualified professional review where required;
- ensure payment records distinguish authorization, capture, refund, dispute and payout;
- never describe an unpaid or simulated transaction as paid.

**No commission percentage is fixed by this roadmap.** It should be selected only after real Marketplace data and payment costs are available.

---

## Phase 6 — Optional Seller Pro

**Objective:** introduce optional professional tools without removing the basic free Seller path.

Possible future Pro capabilities:

- additional listing capacity;
- advanced analytics;
- advanced Zorgax tools;
- automation;
- business workflow tools;
- promotional tools;
- professional inventory/operations features.

`SELLER_PRO` must remain distinct from `PAYMENT_READY` and from identity/business verification.

A Seller could therefore be, for example:

```text
membership: SELLER_FREE
payment: PAYMENT_READY
verification: VERIFIED_FOR_REQUIRED_PAYMENT_CHECKS
```

or:

```text
membership: SELLER_PRO
payment: PAYMENT_NOT_CONFIGURED
verification: NOT_REQUESTED
```

---

## App Store / Google Play payment boundary

Store compliance must be reviewed again immediately before release because platform rules can change.

The architecture must distinguish at least:

1. **physical goods and services consumed outside the app**;
2. **person-to-person/service marketplace cases where applicable**;
3. **digital goods, digital content and app functionality**;
4. **MyZubster digital upgrades such as future in-app Seller Pro capabilities**.

As of this roadmap publication, Apple and Google distinguish physical/off-app commerce from digital functionality/content. Digital features sold for use inside the app can trigger store billing requirements, while physical goods/services are treated differently. The production implementation must follow the rules applicable at release time and in each distribution region.

Official references:

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play Payments policy: https://support.google.com/googleplay/android-developer/answer/9858738

---

## Privacy principle

MyZubster should not request banking or payment information merely because someone wants to experiment as a Seller.

Financial onboarding begins only when a feature actually requires it.

Where possible, regulated payment providers should collect and manage the sensitive payment/verification information required for their service, while MyZubster keeps the minimum integration state necessary for product operation and evidence.

---

## Evidence-first payment principle

Payments follow the same evidence philosophy used elsewhere in MyZubster:

```text
REQUESTED
→ ONBOARDING
→ AUTHORIZED
→ PAID
→ SETTLED
```

These states must not be treated as synonyms.

Likewise:

```text
SELLER_FREE != VERIFIED SELLER
PAYMENT_ONBOARDING != PAYMENT_READY
PAYMENT_AUTHORIZED != PAID
PAID != SETTLED
```

The UI, APIs, logs and Zorgax responses should preserve these distinctions.

---

## Implementation priority

### NOW

- finish `SELLER_FREE` runtime activation;
- remove Stripe/payment requirement from basic Seller onboarding;
- enforce and clearly display the initial free-listing policy;
- instrument Seller/listing/request/completion metrics;
- update Marketplace UI and Zorgax guidance;
- add automated tests for the free Seller path.

### NEXT

- analyze Marketplace usage;
- design payment-state model;
- define eligible payment categories;
- design `Activate payments` UX;
- evaluate payment provider integration and compliance requirements;
- implement sandbox/test payment flows before production.

### LATER

- enable production payment onboarding for eligible Sellers;
- enable real transaction processing;
- introduce a transparent marketplace fee only after cost/usage analysis;
- evaluate optional `SELLER_PRO` features;
- continuously review App Store, Google Play, payment-provider and applicable legal requirements.

---

## Product promise

> **Join for free. Experiment for free. Build real Marketplace activity first. Financial onboarding starts only when payments are actually needed.**

This roadmap describes intended product direction. Items not yet implemented or independently verified must not be represented as production capabilities.