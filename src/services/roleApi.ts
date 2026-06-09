import type { Role, Permission } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

type ApiResponse<T> = {
	result: number;
	message: string;
	data: T;
	errMsg: string;
	statusCode: string;
};

async function getApiData<T>(url: string): Promise<T> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`API error: ${res.status}`);

	const json: ApiResponse<T> = await res.json();
	return json.data;
}

export function getPermissions(): Promise<number[]> {
  	return getApiData<number[]>(`${API_URL}/permissions`);
}

export function getRoles(): Promise<Role[]> {
  	return getApiData<Role[]>(`${API_URL}/roles`);
}

export async function updateRolePermissionsApi(
	roleId: number,
	permissionIds: number[]
) {
	const res = await fetch(`${API_URL}/roles/${roleId}/permissions`, {
		method: "PUT",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify({
		roleId,
		permissionIds,
		}),
	});

	if (!res.ok) {
		throw new Error("Cannot update role permissions");
	}

	const json = await res.json();
	return json.data;
}

export async function createRoleApi(data: {
  name: string;
  description: string;
  permissionIds: number[];
}) {
  const res = await fetch(`${API_URL}/roles/Create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Create role failed");
  }

  return json.data;
}

export async function deleteRoleApi(id: number): Promise<boolean> {
  const res = await fetch(`${API_URL}/roles/${id}`, {
    method: "DELETE",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Delete role failed");
  }

  return true;
}