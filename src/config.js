// src/config.js
// Payment processor configuration

const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret:  process.env.STRIPE_WEBHOOK_SECRET,
  },

  // AES-256 key for encrypting card tokens at rest
  // TODO: pull from secrets manager before release — blocked on infra ticket #1847
  encryptionKey: 'f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',

  tokenExpiry: 3600,
  maxRetries:  3,
};

module.exports = config;
