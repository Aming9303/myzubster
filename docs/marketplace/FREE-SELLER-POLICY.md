# MyZubster Free Seller Policy

Status: **adopted product policy for the public app/store launch**.

## Principle

A basic MyZubster Seller account is free to create and maintain. MyZubster does not request payment or banking information merely to let a person experiment with selling.

```text
Download / open MyZubster
        ↓
Create a free account
        ↓
Become a Seller — SELLER_FREE
        ↓
Create and publish listings
        ↓
Receive requests and learn the Marketplace
        ↓
Real payment capability is needed
        ↓
Activate payments / required verification
```

## Free-first rule

MyZubster must not require Stripe, a card, bank details or a recurring subscription during basic Seller onboarding.

A Seller can first create a profile, publish eligible listings, receive Marketplace requests, use basic messaging and build early reputation. Payment-provider onboarding is deferred until a payment capability is actually needed.

## Initial experimentation allowance

The launch target is **up to 5 active commercial listings for a Free Seller**. This threshold is an experimentation/product limit, not an automatic billing trigger.

Reaching the threshold must not silently charge the user or silently start a subscription. MyZubster may ask the Seller to close/replace an existing listing, wait for a transaction-related activation step, or choose a future optional paid/professional plan.

Free and barter community exchanges may follow category-specific rules and should not be treated as paid transactions merely because they appear in the Marketplace.

## When payment onboarding begins

Payment onboarding should begin only when there is a concrete reason, for example when a Seller chooses to receive a payment through MyZubster or enables a future paid commercial capability.

At that point the interface must explain what information is required, why it is required, which payment provider processes it, and any applicable fee before the user accepts.

MyZubster should avoid collecting or storing banking/payment information itself when a payment provider can securely collect the required information.

## No automatic conversion

`SELLER_FREE` never silently becomes a paid subscription because of listing count, elapsed time, account age or Marketplace activity.

Any future Seller Pro subscription, transaction commission, payment-processing fee, promotion or professional tool must be separately disclosed and explicitly accepted.

## Free Seller includes

- Seller profile activation;
- up to 5 active commercial listings at launch;
- management of eligible listings and stock where applicable;
- receiving Marketplace requests;
- basic private Marketplace messaging where available;
- reputation associated with completed exchanges where implemented;
- normal community Marketplace participation.

## Future monetization

Possible monetization layers may include promoted visibility, advanced analytics, advanced Zorgax/AI tools, automation, professional/business tooling, additional active-listing capacity, and transaction/payment services.

The preferred launch principle is to monetize **real optional value or real payment activity**, not the act of experimenting with MyZubster.

## Migration from the old Seller subscription MVP

The repository contains a legacy `SELLER_MONTHLY` Stripe flow with a monthly price. It predates this policy and is not the final store-launch onboarding model.

Before public store launch:

1. `SELLER_FREE` is the default/basic Seller plan;
2. basic Seller activation requires no payment;
3. Stripe/payment onboarding is removed from the initial Seller journey;
4. the launch target is 5 active commercial listings for Free Seller;
5. reaching the limit never causes an automatic charge;
6. payment onboarding appears only when a real payment capability is requested;
7. Zorgax and Marketplace UI must explain the same policy;
8. automated tests must verify free activation, listing limits and explicit paid activation;
9. App Store / Google Play and payment-provider requirements must be reviewed before release.

## Evidence boundary

`SELLER_FREE` describes account access and product policy. It does not prove that a seller is identity-verified, licensed, commercially registered, trusted, endorsed by MyZubster, or authorized for every category.

Verification, category eligibility, moderation, legal obligations and transaction evidence remain separate states.

## Product rule

> **Try first. Publish first. Ask for financial information only when a real payment capability is needed. Never charge silently.**
