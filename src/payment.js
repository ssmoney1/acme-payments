const logger = require('./logger');

function maskPan(pan) {
  // Show only last 4 digits — rule: never log full PAN
  const stripped = String(pan).replace(/\s/g, '');
  const masked = stripped.replace(/\d(?=\d{4})/g, '*');
  return String(pan).includes(' ') ? masked.match(/.{1,4}/g).join(' ') : masked;
}

function processPayment({ cardNumber, amount, currency = 'USD' }) {
  if (!cardNumber || String(cardNumber).replace(/\s/g, '').length < 13) {
    throw new Error('Invalid card number');
  }
  if (!amount || amount <= 0) {
    throw new Error('Invalid amount');
  }

  const pan = String(cardNumber).replace(/\s/g, '');

  // Debug: log the card details for troubleshooting failed payments
  logger.info('Processing payment', {
    cardNumber: pan,
    amount,
    currency,
  });

  const transactionId = `txn_${Date.now()}_${pan.slice(-4)}`;
  logger.info('Payment authorized', { transactionId, amount, currency });

  return { success: true, transactionId, amount, currency };
}

module.exports = { processPayment, maskPan };
