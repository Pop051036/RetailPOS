export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  imageUrl: string;
  status: 'active' | 'inactive';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'card';
  cashReceived?: number;
  change?: number;
}

export interface StockMovement {
  id: string;
  date: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjust';
  quantity: number;
  cost?: number;
  supplier?: string;
  note?: string;
  user: string;
}

export type RoleId = string;

export type Permission =
'view:dashboard' |
'view:pos' |
'view:cart' |
'view:products' |
'manage:products' |
'view:categories' |
'manage:categories' |
'view:stock' |
'manage:stock' |
'view:reports' |
'view:admin' |
'manage:users' |
'manage:roles';

export interface Role {
  id: RoleId;
  name: string;
  description: string;
  permissions: Permission[];
  isBuiltIn?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: RoleId;
  status: 'active' | 'inactive';
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
}