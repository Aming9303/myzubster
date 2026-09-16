# MyZubster Free Seller Policy

Status: **adopted product policy for the public app/store launch**.

## Principle

A basic MyZubster Seller account is free to create and maintain.

The intended public onboarding flow is:

```text
Download / open MyZubster
        ↓
Create a free account
        ↓
Become a Seller — free
        ↓
Create a listing
        ↓
Publish
```

MyZubster must not require a recurring subscription merely to obtain the basic Seller role or publish listings that are eligible under Marketplace rules.

## Free Seller includes

- Seller profile activation;
- creation and management of eligible Marketplace listings;
- basic stock/listing management where applicable;
- receiving Marketplace requests;
- basic private Marketplace messaging where available;
- reputation associated with completed exchanges where implemented;
- access to normal community Marketplace participation.

## Optional paid services

The free Seller policy does **not** require every MyZubster service to be free. Future optional paid services may include, for example:

- promoted visibility;
- advanced analytics;
- advanced Zorgax/AI tools;
- automation;
- professional or business tooling;
- transaction/payment processing services where applicable.

Paid features must remain optional and must not silently convert a Free Seller account into a recurring subscription.

## Transactions and fees

A free Seller account means **no recurring fee merely for being a basic Seller**. It does not mean that every future transaction or third-party payment service must have zero cost.

Any transaction fee, payment-processing fee, commission, tax, paid promotion or premium feature must be disclosed separately before the user accepts it and must comply with the applicable platform/store and payment-provider rules.

## Migration from the current Seller subscription MVP

The repository currently contains a `SELLER_MONTHLY` MVP flow with Stripe billing and a default monthly price. That implementation predates this policy and must not be treated as the final store-launch Seller model.

Before public store launch:

1. introduce a permanent `SELLER_FREE` plan;
2. make Free Seller the default/basic Seller activation path;
3. remove payment as a prerequisite for basic Seller activation;
4. keep paid plans/features explicitly optional;
5. update Zorgax Seller guidance and Marketplace UI copy;
6. update automated tests for free activation and paid-feature separation;
7. verify App Store / Google Play payment and marketplace requirements before release;
8. preserve clear evidence and audit logs for paid transactions without claiming payment when none occurred.

## Evidence boundary

`SELLER_FREE` describes account access and product policy. It does not prove that a seller is identity-verified, licensed, commercially registered, trusted, endorsed by MyZubster, or authorized for every category.

Verification, category eligibility, moderation, legal obligations and transaction evidence remain separate states.

## Product rule

> **Join for free. Become a Seller for free. Pay only for clearly disclosed optional services or transaction-related costs when applicable.**
