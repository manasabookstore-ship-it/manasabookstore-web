export type PaymentProvider = "phonepe" | "store";

export type PaymentStatus = "pending" | "not_started" | "paid" | "failed";

export type PaymentOption = {
  id: "phonepe_upi" | "pay_at_store_pickup";
  provider: PaymentProvider;
  title: string;
  description: string;
  status: PaymentStatus;
};

export type PhonePePaymentConfig = {
  merchantName: string;
  upiId: string;
  enabled: boolean;
};
