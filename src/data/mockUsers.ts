import { User, Role, Permission } from '../types';

export const allPermissions: {
  key: Permission;
  label: string;
  group: string;
}[] = [
{ key: 'view:dashboard', label: 'ดูแดชบอร์ด', group: 'แดชบอร์ด' },
{ key: 'view:pos', label: 'เข้าหน้าขาย (POS)', group: 'การขาย' },
{ key: 'view:cart', label: 'จัดการตะกร้าและชำระเงิน', group: 'การขาย' },
{ key: 'view:products', label: 'ดูสินค้า', group: 'สินค้า' },
{ key: 'manage:products', label: 'เพิ่ม/แก้ไข/ลบสินค้า', group: 'สินค้า' },
{ key: 'view:categories', label: 'ดูหมวดหมู่', group: 'สินค้า' },
{ key: 'manage:categories', label: 'จัดการหมวดหมู่', group: 'สินค้า' },
{ key: 'view:stock', label: 'ดูสต็อก', group: 'สต็อก' },
{ key: 'manage:stock', label: 'รับเข้า/ปรับสต็อก', group: 'สต็อก' },
{ key: 'view:reports', label: 'ดูรายงานการขาย', group: 'รายงาน' },
{ key: 'view:admin', label: 'เข้าโซนผู้ดูแลระบบ', group: 'ผู้ดูแลระบบ' },
{ key: 'manage:users', label: 'จัดการผู้ใช้งาน', group: 'ผู้ดูแลระบบ' },
{ key: 'manage:roles', label: 'จัดการบทบาทและสิทธิ', group: 'ผู้ดูแลระบบ' }];


export const initialRoles: Role[] = [
{
  id: 'owner',
  name: 'เจ้าของร้าน',
  description: 'สิทธิ์เต็ม สามารถจัดการได้ทุกส่วนของระบบ',
  permissions: allPermissions.map((p) => p.key),
  isBuiltIn: true
},
{
  id: 'manager',
  name: 'ผู้จัดการ',
  description: 'จัดการการขาย สินค้า สต็อก และดูรายงานได้',
  permissions: [
  'view:dashboard',
  'view:pos',
  'view:cart',
  'view:products',
  'manage:products',
  'view:categories',
  'manage:categories',
  'view:stock',
  'manage:stock',
  'view:reports'],

  isBuiltIn: true
},
{
  id: 'cashier',
  name: 'พนักงานขาย',
  description: 'ใช้งานหน้าขาย POS และจัดการตะกร้าเท่านั้น',
  permissions: ['view:pos', 'view:cart', 'view:products'],
  isBuiltIn: true
}];


export const mockUsers: User[] = [
{
  id: 'u1',
  name: 'สมชาย ใจดี',
  email: 'somchai@retailpos.th',
  roleId: 'owner',
  status: 'active',
  lastLogin: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  createdAt: '2024-01-15T08:00:00Z'
},
{
  id: 'u2',
  name: 'มาลี ศรีสุข',
  email: 'malee@retailpos.th',
  roleId: 'manager',
  status: 'active',
  lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  createdAt: '2024-02-10T08:00:00Z'
},
{
  id: 'u3',
  name: 'อนุชา รักดี',
  email: 'anucha@retailpos.th',
  roleId: 'cashier',
  status: 'active',
  lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  createdAt: '2024-05-22T08:00:00Z'
},
{
  id: 'u4',
  name: 'สุดา จันทร์เพ็ญ',
  email: 'suda@retailpos.th',
  roleId: 'cashier',
  status: 'active',
  lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  createdAt: '2024-08-01T08:00:00Z'
},
{
  id: 'u5',
  name: 'ประเสริฐ มั่นคง',
  email: 'prasert@retailpos.th',
  roleId: 'cashier',
  status: 'inactive',
  lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  createdAt: '2024-03-18T08:00:00Z'
}];