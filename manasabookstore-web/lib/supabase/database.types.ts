export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          id: string;
          title: string;
          placement: string;
          image_url: string | null;
          link_url: string | null;
          starts_at: string | null;
          ends_at: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          placement: string;
          image_url?: string | null;
          link_url?: string | null;
          starts_at?: string | null;
          ends_at?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["ads"]["Insert"]>;
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          title: string;
          description: string | null;
          discount_type: "percent" | "amount" | "note";
          discount_value: number;
          starts_at: string | null;
          ends_at: string | null;
          is_active: boolean;
          usage_limit: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          title: string;
          description?: string | null;
          discount_type?: "percent" | "amount" | "note";
          discount_value?: number;
          starts_at?: string | null;
          ends_at?: string | null;
          is_active?: boolean;
          usage_limit?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["coupons"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_phone: string;
          customer_note: string | null;
          status: "requested" | "confirmed" | "ready" | "completed" | "cancelled";
          source: "website" | "whatsapp" | "store";
          subtotal: number;
          coupon_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_phone: string;
          customer_note?: string | null;
          status?: "requested" | "confirmed" | "ready" | "completed" | "cancelled";
          source?: "website" | "whatsapp" | "store";
          subtotal?: number;
          coupon_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          sku: string;
          barcode: string | null;
          price: number;
          stock: number;
          low_stock: number;
          is_featured: boolean;
          is_active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          sku: string;
          barcode?: string | null;
          price?: number;
          stock?: number;
          low_stock?: number;
          is_featured?: boolean;
          is_active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: "customer" | "staff" | "admin" | "owner";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: "customer" | "staff" | "admin" | "owner";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      sale_items: {
        Row: {
          id: string;
          sale_id: string;
          product_id: string | null;
          product_name: string;
          sku: string | null;
          quantity: number;
          unit_price: number;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          sale_id: string;
          product_id?: string | null;
          product_name: string;
          sku?: string | null;
          quantity: number;
          unit_price: number;
          line_total: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sale_items"]["Insert"]>;
        Relationships: [];
      };
      sales: {
        Row: {
          id: string;
          receipt_no: string;
          cashier_id: string | null;
          payment_mode: "cash" | "upi" | "card";
          subtotal: number;
          total: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          receipt_no: string;
          cashier_id?: string | null;
          payment_mode?: "cash" | "upi" | "card";
          subtotal?: number;
          total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sales"]["Insert"]>;
        Relationships: [];
      };
      store_settings: {
        Row: {
          id: string;
          store_name: string;
          phone: string | null;
          whatsapp: string | null;
          address: string | null;
          map_url: string | null;
          online_ordering_enabled: boolean;
          pickup_enabled: boolean;
          delivery_enabled: boolean;
          phonepe_upi_id: string | null;
          phonepe_merchant_name: string;
          online_upi_payment_enabled: boolean;
          pay_at_store_enabled: boolean;
          pickup_payment_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_name: string;
          phone?: string | null;
          whatsapp?: string | null;
          address?: string | null;
          map_url?: string | null;
          online_ordering_enabled?: boolean;
          pickup_enabled?: boolean;
          delivery_enabled?: boolean;
          phonepe_upi_id?: string | null;
          phonepe_merchant_name?: string;
          online_upi_payment_enabled?: boolean;
          pay_at_store_enabled?: boolean;
          pickup_payment_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["store_settings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      coupon_discount_type: "percent" | "amount" | "note";
      order_source: "website" | "whatsapp" | "store";
      order_status: "requested" | "confirmed" | "ready" | "completed" | "cancelled";
      payment_mode: "cash" | "upi" | "card";
      user_role: "customer" | "staff" | "admin" | "owner";
    };
  };
};
