export type CustomerRequestPayload = {
  name: string;
  phone: string;
  category: string;
  requestedItem: string;
  notes: string;
};

export type CustomerRequestResponse = {
  id: string;
  whatsappHref: string;
  message: string;
};

export async function submitCustomerRequest(
  payload: CustomerRequestPayload,
): Promise<CustomerRequestResponse | null> {
  const response = await fetch("/api/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CustomerRequestResponse;
}

