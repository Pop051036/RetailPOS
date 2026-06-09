import type { User } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/Users";

type ApiResponse<T> = {
  result: number;
  message: string;
  data: T;
  errMsg: string;
  statusCode: string;
};

export type UserFormPayload = {
  name: string;
  email: string;
  roleId: number;
  status: boolean;
};

async function getApiData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export function getUsers(): Promise<User[]> {
  return getApiData<User[]>(API_URL);
}

export async function createUserApi(data: UserFormPayload): Promise<User> {

  const res = await fetch(API_URL + "/Create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json: ApiResponse<User> = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Create user failed");
  }

  return json.data;
}

export async function updateUserApi(
  id: number,
  data: UserFormPayload
): Promise<User> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...data,
    }),
  });

  const json: ApiResponse<User> = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Update user failed");
  }

  return json.data;
}

export async function deleteUserApi(id: number): Promise<boolean> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Delete user failed");
  }

  return true;
}