import React, { useMemo, useState, createContext, useContext } from 'react';
import { User, Role, RoleId, Permission } from '../types';
import { mockUsers, initialRoles } from '../data/mockUsers';
interface AuthContextType {
  currentUser: User;
  users: User[];
  roles: Role[];
  setCurrentUserById: (userId: number) => void;
  hasPermission: (permission: Permission) => boolean;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id' | 'isBuiltIn'>) => Role;
  updateRolePermissions: (roleId: RoleId, permissions: number[]) => void;
  updateRole: (
  roleId: RoleId,
  patch: Partial<Omit<Role, 'id' | 'isBuiltIn'>>)
  => void;
  deleteRole: (roleId: RoleId) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: ReactNode;}) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [currentUserId, setCurrentUserId] = useState<string>(mockUsers[0].id);
  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || users[0],
    [users, currentUserId]
  );
  const currentRole = useMemo(
    () => roles.find((r) => r.id === currentUser.roleId),
    [roles, currentUser]
  );
  const hasPermission = (permission: Permission) => {
    return currentRole?.permissions.includes(permission) ?? false;
  };
  const setCurrentUserById = (userId: string) => {
    setCurrentUserId(userId);
  };
  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: `u${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setUsers((prev) => [...prev, newUser]);
  };
  const updateUser = (id: string, patch: Partial<User>) => {
    setUsers((prev) =>
    prev.map((u) =>
    u.id === id ?
    {
      ...u,
      ...patch
    } :
    u
    )
    );
  };
  const deleteUser = (id: string) => {
    if (id === currentUserId) {
      alert('ไม่สามารถลบบัญชีที่กำลังใช้งานอยู่ได้');
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };
  const addRole = (role: Omit<Role, 'id' | 'isBuiltIn'>): Role => {
    const newRole: Role = {
      ...role,
      id: `role_${Date.now()}`,
      isBuiltIn: false
    };
    setRoles((prev) => [...prev, newRole]);
    return newRole;
  };
  const updateRolePermissions = (roleId: RoleId, permissions: number[]) => {
    setRoles((prev) =>
    prev.map((r) =>
    r.id === roleId ?
    {
      ...r,
      permissions
    } :
    r
    )
    );
  };
  const updateRole = (
  roleId: RoleId,
  patch: Partial<Omit<Role, 'id' | 'isBuiltIn'>>) =>
  {
    setRoles((prev) =>
    prev.map((r) =>
    r.id === roleId ?
    {
      ...r,
      ...patch
    } :
    r
    )
    );
  };
  const deleteRole = (roleId: RoleId) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
    if (role.isBuiltIn) {
      alert('ไม่สามารถลบบทบาทพื้นฐานของระบบได้');
      return;
    }
    const userCount = users.filter((u) => u.roleId === roleId).length;
    if (userCount > 0) {
      alert(
        `ไม่สามารถลบบทบาท "${role.name}" ได้ เนื่องจากมีผู้ใช้งาน ${userCount} คนใช้บทบาทนี้อยู่`
      );
      return;
    }
    setRoles((prev) => prev.filter((r) => r.id !== roleId));
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        roles,
        setCurrentUserById,
        hasPermission,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRolePermissions,
        updateRole,
        deleteRole
      }}>

      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}