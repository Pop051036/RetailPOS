import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types';
interface ProtectedRouteProps {
  permission: Permission;
  children: React.ReactNode;
}
export function ProtectedRoute({ permission, children }: ProtectedRouteProps) {
  const { hasPermission, currentUser, roles } = useAuth();
  const role = roles.find((r) => r.id === currentUser.roleId);
  if (!hasPermission(permission)) {
    return (
      <div className="max-w-xl mx-auto mt-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            ไม่มีสิทธิ์เข้าถึงหน้านี้
          </h2>
          <p className="text-slate-500 mb-1">
            บัญชี <strong>{currentUser.name}</strong> ({role?.name})
            ไม่มีสิทธิ์ดูข้อมูลส่วนนี้
          </p>
          <p className="text-xs text-slate-400 mb-6">
            สิทธิ์ที่ต้องการ:{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded">
              {permission}
            </code>
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
            
            กลับไปหน้าหลัก
          </Link>
        </div>
      </div>);

  }
  return <>{children}</>;
}