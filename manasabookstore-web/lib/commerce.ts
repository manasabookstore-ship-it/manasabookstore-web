import { Product } from "./site-data";

export type CartItem = {
  slug: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export type CustomerProfile = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type CheckoutMode = "pickup" | "delivery";
export type PaymentMode = "phonepe_upi" | "pay_at_store_pickup";

export type CommerceSettings = {
  onlineOrderingEnabled: boolean;
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  phonePeUpiId: string;
  phonePeMerchantName: string;
  onlineUpiPaymentEnabled: boolean;
  payAtStoreEnabled: boolean;
  pickupPaymentEnabled: boolean;
};

export const defaultCommerceSettings: CommerceSettings = {
  onlineOrderingEnabled: false,
  pickupEnabled: false,
  deliveryEnabled: false,
  phonePeUpiId: "",
  phonePeMerchantName: "Manasa Book Center",
  onlineUpiPaymentEnabled: false,
  payAtStoreEnabled: true,
  pickupPaymentEnabled: true,
};

export function parseProductPrice(price: string) {
  const match = price.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

export function productToCartItem(product: Product): CartItem {
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: parseProductPrice(product.price),
    quantity: 1,
  };
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
