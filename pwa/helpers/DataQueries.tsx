import {
  AddressCreateInterface,
  AddressInterface,
  AddressUpdateInterface,
} from "../interfaces/AddressInterface";
import {
  AiImageCreateInterface,
  AiImageInterface,
} from "../interfaces/AiImageInterface";
import {
  ApiPlatformItemResponse,
  ApiPlatformResponse,
} from "../interfaces/ApiPlatformResponseInterface";
import {
  CartCreateInterface,
  CartInterface,
  CartUpdateInterface,
} from "../interfaces/CartInterface";
import {
  CreateEditorImageCreateInterface,
  CreateEditorImageUpdateInterface,
} from "../interfaces/CreateEditorImageInterface";
import {
  CreateEditorInstanceCreateInterface,
  CreateEditorInstanceInterface,
  CreateEditorInstanceUpdateInterface,
} from "../interfaces/CreateEditorInstanceInterface";
import { MediaObjectInterface } from "../interfaces/MediaObjectInterface";
import {
  PrintfulOrderCreateInterface,
  PrintfulOrderInterface,
  PrintfulOrdersResponse,
} from "../interfaces/OrderInterface";
import { PaymentMethodCreateInterface } from "../interfaces/PaymentMethodInterface";
import { PrintfulSyncProductInterface } from "../interfaces/PrintfulSyncProductInterface";
import {
  PrintfulCatalogProductInterface,
  ProductInterface,
} from "../interfaces/ProductInterface";
import {
  ReviewCreateInterface,
  ReviewInterface,
} from "../interfaces/ReviewInterface";
import {
  AuthenticatedUserInterface,
  CreateUserInterface,
  LoginUserInterface,
} from "../interfaces/UserInterface";
import panda3 from "../public/panda3.jpeg";

// export async function createMockupTask(
//   shirtColorVariantId: number,
//   imageID: string
// ) {
//   const response = await fetch(
//     `/mockup-task-generator/${shirtColorVariantId}/${imageID}`
//   );
//   const jsonResponse = await response.json();
//   console.log(" mockup-task-generator response", jsonResponse);
//   return jsonResponse;
// }

// export async function shirtPreview(taskKey: string) {
//   const response = await fetch(`/shirt-preview/${taskKey}`);
//   const jsonResponse = await response.json();
//   console.log("shirt Preview response", jsonResponse);
//   return jsonResponse;
// }

// export async function createAiImage(image: AiImageCreateInterface) {
//   const response = await fetch("/api/ai_images", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(image),
//   });
//   return (await response.json()) as AiImageInterface;
// }

// export async function removeBackgroundFromAiImage(form: FormData) {
//   const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
//     method: "POST",
//     //@ts-ignore
//     headers: {
//       "x-api-key": process.env.NEXT_PUBLIC_CLIP_DROP_API_KEY,
//     },
//     body: form,
//   });
//   console.log("response inside: ", response);
//   return response;
// }

export async function createReview(review: ReviewCreateInterface) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  const jsonResponse = (await response.json()) as ApiPlatformItemResponse;
  return jsonResponse as ReviewInterface;
}

export async function createAddress(
  address: AddressCreateInterface,
  stripeCustomerID: string
) {
  const response = await fetch(`/stripe/${stripeCustomerID}/new/address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  const jsonResponse = (await response.json()) as AddressInterface;
  return jsonResponse;
}

export async function retrieveStripeCustomer(stripeCustomerID: string) {
  const response = await fetch(`/stripe/${stripeCustomerID}/retrieve/address`, {
    method: "GET",
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function updateAddress(
  id: string,
  address: AddressUpdateInterface
) {
  const response = await fetch("/api/addresses/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  const jsonResponse = (await response.json()) as AddressInterface;
  return jsonResponse;
}

export async function deleteAddress(id: string) {
  await fetch("/api/addresses/" + id, {
    method: "DELETE",
  });
}

export async function updateUser(id: string, user: any) {
  const response = await fetch("/api/users/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const jsonResponse = (await response.json()) as AuthenticatedUserInterface;
  return jsonResponse;
}

export async function deleteUser(id: string) {
  await fetch("/api/users/" + id, {
    method: "DELETE",
  });
}

export async function createPrintfulSyncProduct(
  syncProduct: PrintfulSyncProductInterface
) {
  const response = await fetch("/create-printful-sync-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(syncProduct),
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function fetchCatalogProduct(productId: string) {
  const response = await fetch(`http://caddy/catalogProducts/${productId}`);
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function fetchMockupPrintfiles(productId: number) {
  const response = await fetch(`http://caddy/printFiles/${productId}`);
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function createPrintfulMockUpTask(productId: number, task: any) {
  const response = await fetch("/mockup-task-generator/" + productId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function fetchPrintfulMockupTemplates(productId: number) {
  const response = await fetch("http://caddy/mockup-templates/" + productId);
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/upload-image", {
    method: "POST",
    body: formData,
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function createMediaObject(file?: File, url?: string) {
  let response = null;
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    response = await fetch("/api/media_objects", {
      method: "POST",
      body: formData,
    });
  } else if (url) {
    response = await fetch("/api/media_objects", {
      method: "POST",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const jsonResponse = (await response?.json()) as MediaObjectInterface;
  return jsonResponse;
}

export async function fetchMediaObject(id: string) {
  const response = await fetch(`/api/media_objects/${id}`);
  const jsonResponse = (await response.json()) as MediaObjectInterface;
  return jsonResponse;
}

export async function fetchMediaObjects() {
  const response = await fetch("/api/media_objects");
  const jsonResponse =
    (await response.json()) as ApiPlatformResponse<MediaObjectInterface>;
  return jsonResponse["hydra:member"] as MediaObjectInterface[];
}

export async function createCustomMockup(
  object: {
    files: {
      placement: string;
      image_url: string;
    }[];
    variant_ids: number[];
  },
  productId: string | number
) {
  const response = await fetch("/create-mockup/" + productId, {
    method: "POST",
    body: JSON.stringify(object),
  });
  const jsonResponse = (await response.json()) as {
    placement: string;
    mockup_url: string;
    variant_ids: number[];
  }[];
  return jsonResponse;
}

export async function fetchPrintfulSyncProduct(id: string) {
  const response = await fetch("/sync-product/" + id);
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function fetchPrintfulSyncProducts() {
  const response = await fetch("http://caddy/sync-products");
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function createPrintfulOrder(
  // order: OrderCreateInterface,
  sessionId: string
) {
  const response = await fetch("/printful-orders-create/" + sessionId, {
    method: "POST",
  });
  const jsonResponse = (await response.json()) as PrintfulOrderInterface;
  return jsonResponse;
}

export async function fetchPrintfulOrders() {
  const response = await fetch("/printful-orders");
  const jsonResponse = (await response.json()) as PrintfulOrdersResponse;
  return jsonResponse;
}

export async function fetchPrintfulOrdersFromServerSide(accessToken: string) {
  const response = await fetch("http://caddy/printful-orders", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
  });
  const jsonResponse = (await response.json()) as PrintfulOrdersResponse;
  return jsonResponse;
}

export async function fetchPrintfulOrder(id: string) {
  const response = await fetch("/printful-orders/" + id);
  const jsonResponse = (await response.json()) as PrintfulOrderInterface;
  return jsonResponse;
}

export async function fetchPrintfulOrderFromServerSide(id: string) {
  const response = await fetch("http://caddy/printful-orders/" + id);
  const jsonResponse = (await response.json()) as PrintfulOrderInterface;
  return jsonResponse;
}

export async function fetchStripePaymentMethods() {
  // /api/billing/payment-methods
  const response = await fetch("/api/billing/payment-methods");
  return await response.json();
}

export async function updateStripeCustomersDefaultPaymentMethod(
  paymentMethodId: string
) {
  const response = await fetch(
    `/api/billing/payment-methods/${paymentMethodId}`,
    {
      method: "POST",
    }
  );
  return await response.json();
}

export async function createStripePaymentMethod(
  paymentMethod: PaymentMethodCreateInterface
) {
  const response = await fetch("/api/billing/payment-methods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentMethod),
  });
  return await response.json();
}

export async function fetchStripePaymentMethod(id: string) {
  const response = await fetch(`/api/billing/payment-methods/${id}`);
  return await response.json();
}

export async function fetchStripePaymentMethodFromServerSideProps(id: string) {
  const response = await fetch(
    `http://caddy/api/billing/payment-methods/${id}`
  );
  return await response.json();
}

export async function deleteStripePaymentMethod(id: string) {
  const response = await fetch(`/api/billing/payment-methods/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

export async function fetchStripeCustomer(stripeCustomerId: string) {
  const response = await fetch(`/api/billing/customers/${stripeCustomerId}`);
  return await response.json();
}

export async function createCreateEditorInstance(
  createEditorInstance: CreateEditorInstanceCreateInterface
) {
  const response = await fetch("/api/create_editor_instances", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createEditorInstance),
  });
  return (await response.json()) as CreateEditorInstanceInterface;
}

export async function updateCreateEditorInstance(
  createEditorInstance: CreateEditorInstanceUpdateInterface,
  id: string
) {
  const response = await fetch(`/api/create_editor_instances/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createEditorInstance),
  });
  return (await response.json()) as CreateEditorInstanceInterface;
}

export async function createCreateEditorImage(
  createEditorImage: CreateEditorImageCreateInterface
) {
  const response = await fetch("/api/create_editor_images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createEditorImage),
  });
  return (await response.json()) as CreateEditorInstanceInterface;
}

export async function updateCreateEditorImage(
  createEditorImage: CreateEditorImageUpdateInterface,
  id: string
) {
  const response = await fetch("/api/create_editor_images/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createEditorImage),
  });
  return (await response.json()) as CreateEditorInstanceInterface;
}

export async function fetchCreateEditorInstance(id: string) {
  const response = await fetch(`/api/create_editor_instances/${id}`);
  const createEditorInstance =
    (await response.json()) as CreateEditorInstanceInterface;
  return createEditorInstance;
}
