const API_URL = import.meta.env.VITE_API_URL + "/Products";

type ApiResponse<T> = {
  result: number;
  message: string;
  data: T;
  errMsg: string;
  statusCode: string;
};

export type Product = {
  id: number;
  sku: string;
  barcode?: string | null;
  name: string;
  categoryId: number;
  description?: string | null;
  cost: number;
  price: number;
  stock: number;
  minStock: number;
  imageUrl?: string | null;
  status: boolean;
  createDate?: string;
  updateDate?: string | null;
};

export type ProductPayload = {
  sku: string;
  barcode?: string;
  name: string;
  categoryId: number;
  description?: string;
  cost: number;
  price: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  status: boolean;
};

async function getApiData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json: ApiResponse<T> = await res.json();

  if (!res.ok) throw new Error(json.message || `API error: ${res.status}`);

  return json.data;
}

export function getProducts(): Promise<Product[]> {
  return getApiData<Product[]>(API_URL);
}

export function getProductById(id: number): Promise<Product> {
  return getApiData<Product>(`${API_URL}/${id}`);
}

export async function createProductApi(
  data: ProductPayload
): Promise<Product> {
  const res = await fetch(`${API_URL}/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json: ApiResponse<Product> = await res.json();

  if (!res.ok) throw new Error(json.message || "Create product failed");

  return json.data;
}

export async function updateProductApi(
  id: number,
  data: ProductPayload
): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      ...data,
    }),
  });

  const json: ApiResponse<Product> = await res.json();

  if (!res.ok) throw new Error(json.message || "Update product failed");

  return json.data;
}

export async function deleteProductApi(id: number): Promise<number> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const json: ApiResponse<number> = await res.json();

  if (!res.ok) throw new Error(json.message || "Delete product failed");

  return json.data;
}