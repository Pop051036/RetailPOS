import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Save, Check, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { allPermissions } from '../data/mockUsers';
import { Permission, RoleId } from '../types';
import { getRoleColor } from '../utils/roleColors';
export function AdminRoles() {
  const { roles, updateRolePermissions, deleteRole, users } = useAuth();
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>(roles[0].id);
  const [draftPermissions, setDraftPermissions] = useState<Permission[]>(
    roles[0].permissions
  );
  const [showSaved, setShowSaved] = useState(false);
  // If selected role is deleted externally, fall back to first role
  useEffect(() => {
    if (!roles.find((r) => r.id === selectedRoleId)) {
      setSelectedRoleId(roles[0].id);
      setDraftPermissions(roles[0].permissions);
    }
  }, [roles, selectedRoleId]);
  const selectedRole = roles.find((r) => r.id === selectedRoleId) || roles[0];
  const userCountByRole = (roleId: RoleId) =>
  users.filter((u) => u.roleId === roleId).length;
  const permissionsByGroup = useMemo(() => {
    const grouped: Record<string, typeof allPermissions> = {};
    allPermissions.forEach((p) => {
      if (!grouped[p.group]) grouped[p.group] = [];
      grouped[p.group].push(p);
    });
    return grouped;
  }, []);
  const handleSelectRole = (roleId: RoleId) => {
    setSelectedRoleId(roleId);
    const role = roles.find((r) => r.id === roleId);
    setDraftPermissions(role?.permissions || []);
    setShowSaved(false);
  };
  const togglePermission = (permission: Permission) => {
    setDraftPermissions((prev) =>
    prev.includes(permission) ?
    prev.filter((p) => p !== permission) :
    [...prev, permission]
    );
    setShowSaved(false);
  };
  const handleSave = () => {
    updateRolePermissions(selectedRoleId, draftPermissions);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };
  const handleDelete = (roleId: RoleId) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
    if (window.confirm(`ยืนยันการลบบทบาท "${role.name}"?`)) {
      deleteRole(roleId);
    }
  };
  const isDirty =
  JSON.stringify([...selectedRole.permissions].sort()) !==
  JSON.stringify([...draftPermissions].sort());
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">บทบาทและสิทธิ</h1>
          <p className="text-slate-500">
            กำหนดสิทธิ์การเข้าถึงระบบสำหรับแต่ละบทบาท
          </p>
        </div>
        <Link
          to="/admin/roles/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center transition-colors shadow-sm">
          
          <Plus size={20} className="mr-2" />
          เพิ่มบทบาทใหม่
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
            บทบาททั้งหมด ({roles.length})
          </h2>
          {roles.map((role) => {
            const isActive = role.id === selectedRoleId;
            const color = getRoleColor(role.id);
            return (
              <div
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${isActive ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                
                <div className="flex items-start justify-between mb-2 gap-2">
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full border ${color.badge}`}>
                    
                    <Shield size={11} className="mr-1" />
                    {role.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-500">
                      {userCountByRole(role.id)} คน
                    </span>
                    {!role.isBuiltIn &&
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(role.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                      aria-label="ลบบทบาท">
                      
                        <Trash2 size={14} />
                      </button>
                    }
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {role.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-400">
                    {role.permissions.length} สิทธิ์
                  </p>
                  {role.isBuiltIn &&
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      ระบบ
                    </span>
                  }
                </div>
              </div>);

          })}
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="font-bold text-slate-800">
                  สิทธิ์ของ "{selectedRole.name}"
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {draftPermissions.length} / {allPermissions.length}{' '}
                  สิทธิ์ที่เลือก
                </p>
              </div>
              <div className="flex items-center gap-3">
                {showSaved &&
                <span className="text-sm text-emerald-600 font-medium flex items-center">
                    <Check size={16} className="mr-1" /> บันทึกแล้ว
                  </span>
                }
                <button
                  onClick={handleSave}
                  disabled={!isDirty}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm text-sm">
                  
                  <Save size={16} className="mr-2" />
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(permissionsByGroup).map(
                ([group, permissions]) =>
                <div key={group} className="p-6">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">
                      {group}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {permissions.map((p) => {
                      const checked = draftPermissions.includes(p.key);
                      return (
                        <label
                          key={p.key}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${checked ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                          
                            <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => togglePermission(p.key)}
                            className="w-4 h-4 rounded accent-indigo-600" />
                          
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800">
                                {p.label}
                              </p>
                              <p className="text-xs text-slate-400 font-mono">
                                {p.key}
                              </p>
                            </div>
                          </label>);

                    })}
                    </div>
                  </div>

              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}