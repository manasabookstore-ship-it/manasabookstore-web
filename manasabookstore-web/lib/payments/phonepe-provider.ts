import { PhonePePaymentConfig, PaymentOption } from "./payment-types";

export function getPhonePePaymentOption(
  config: PhonePePaymentConfig,
): PaymentOption {
  return {
    id: "phonepe_upi",
    provider: "phonepe",
    title: "Pay using PhonePe / UPI",
    description: config.enabled
      ? `Use UPI for ${config.merchantName}. Payment is recorded after store confirmation.`
      : "Online UPI payment is currently disabled by the store.",
    status: "not_started",
  };
}

export function buildPhonePeUpiIntent(config: PhonePePaymentConfig, amount: number) {
  if (!config.enabled || !config.upiId) {
    return null;
  }

  const params = new URLSearchParams({
    pa: config.upiId,
    pn: config.merchantName,
    am: amount.toFixed(2),
    cu: "INR",
  });

  // TODO: Replace this UPI intent with official PhonePe Payment Gateway order
  // creation and callback verification after merchant configuration is ready.
  return `upi://pay?${params.toString()}`;
}
