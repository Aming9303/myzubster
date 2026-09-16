const FREE_SELLER_ACTIVE_LISTING_LIMIT = 5;

function freeSellerPlan() {
  return {
    id: 'SELLER_FREE',
    name: 'MyZubster Seller Free',
    amount: 0,
    currency: 'EUR',
    interval: null,
    activeListingLimit: FREE_SELLER_ACTIVE_LISTING_LIMIT,
    paymentMethodRequired: false,
    bankingInformationRequired: false,
    automaticPaidConversion: false,
    paymentActivation: 'WHEN_REAL_PAYMENT_CAPABILITY_IS_REQUESTED',
    benefits: [
      'seller profile',
      'up to 5 active commercial listings',
      'listing and stock management',
      'marketplace requests',
      'basic private messaging',
      'reputation from completed exchanges'
    ]
  };
}

function isFreeSellerActive(membership) {
  return Boolean(membership && membership.plan === 'SELLER_FREE' && membership.status === 'ACTIVE');
}

function canPublishCommercialListing(membership, activeCommercialListings) {
  if (!isFreeSellerActive(membership)) return { allowed: false, reason: 'SELLER_ACTIVATION_REQUIRED' };
  if (Number(activeCommercialListings) >= FREE_SELLER_ACTIVE_LISTING_LIMIT) {
    return {
      allowed: false,
      reason: 'FREE_SELLER_ACTIVE_LISTING_LIMIT',
      limit: FREE_SELLER_ACTIVE_LISTING_LIMIT,
      paymentRequired: false,
      automaticCharge: false
    };
  }
  return { allowed: true, limit: FREE_SELLER_ACTIVE_LISTING_LIMIT };
}

module.exports = {
  FREE_SELLER_ACTIVE_LISTING_LIMIT,
  freeSellerPlan,
  isFreeSellerActive,
  canPublishCommercialListing
};
