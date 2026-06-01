// tests/checkout.integration.test.js
// Stripe test cards per https://stripe.com/docs/testing — NOT real card numbers.
// These are published by Stripe and recognized by their sandbox only.

const STRIPE_TEST_CARDS = {
  visa:            '4242424242424242', // standard Stripe test Visa
  visaDebit:       '4000056655665556',
  mastercard:      '5555555555554444',
  amexSuccess:     '378282246310005',
  declineCard:     '4000000000000002', // always declines in sandbox
  insufficientFunds: '4000000000009995',
};

const { processCheckout } = require('../src/checkout');

describe('Checkout integration (Stripe sandbox)', () => {
  test('processes standard Visa test card', async () => {
    const result = await processCheckout({
      card: STRIPE_TEST_CARDS.visa,
      amount: 79.98,
      currency: 'USD',
    });
    expect(result.success).toBe(true);
  });

  test('handles decline gracefully', async () => {
    await expect(
      processCheckout({ card: STRIPE_TEST_CARDS.declineCard, amount: 10 })
    ).rejects.toThrow();
  });
});
