type WhatsAppNotification = {
  to: string;
  message: string;
};

type WhatsAppResult = {
  configured: boolean;
  sent: boolean;
};

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function getOwnerWhatsAppPhone() {
  const phone = process.env.OWNER_WHATSAPP_PHONE;
  return phone ? normalizePhone(phone) : null;
}

export async function sendWhatsAppTextNotification({
  to,
  message,
}: WhatsAppNotification): Promise<WhatsAppResult> {
  const accessToken = process.env.WHATSAPP_CLOUD_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID;
  const recipient = normalizePhone(to);

  if (!accessToken || !phoneNumberId || !recipient) {
    return { configured: false, sent: false };
  }

  const response = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "text",
        text: {
          preview_url: false,
          body: message,
        },
      }),
    },
  );

  return {
    configured: true,
    sent: response.ok,
  };
}

