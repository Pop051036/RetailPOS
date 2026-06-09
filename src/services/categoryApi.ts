const API_URL = import.meta.env.VITE_API_URL + "/Categories";

type ApiResponse<T> = {
  result: number;
  message: string;
  data: T;
  errMsg: string;
  statusCode: string;
};

export type Category = {
  id: number;
  name: string;
  description?: string | null;
  status: boolean;
  productCount?: number;
  createDate?: string;
  updateDate?: string | null;
};

export type CategoryPayload = {
  name: string;
  description?: string;
  status: boolean;
};

async function getApiData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const json: ApiResponse<T> = await res.json();

  if (!res.ok) throw new Error(json.message || `API error: ${res.status}`);

  return json.data;
}

export function getCategories(): Promise<Category[]> {
  return getApiData<Category[]>(API_URL);
}

export async function createCategoryApi(
  data: CategoryPayload
): Promise<Category> {
  const res = await fetch(API_URL + '/Create', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json: ApiResponse<Category> = await res.json();

  if (!res.ok) throw new Error(json.message || "Create category failed");

  return json.data;
}

export async function updateCategoryApi(
  id: number,
  data: CategoryPayload
): Promise<Category> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      ...data,
    }),
  });

  const json: ApiResponse<Category> = await res.json();

  if (!res.ok) throw new Error(json.message || "Update category failed");

  return json.data;
}

export async function deleteCategoryApi(id: number): Promise<number> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const json: ApiResponse<number> = await res.json();

  if (!res.ok) throw new Error(json.message || "Delete category failed");

  return json.data;
}