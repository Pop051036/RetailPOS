import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Shield, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { allPermissions } from '../data/mockUsers';
import { Permission } from '../types';
export function AddRole() {
  const navigate = useNavigate();
  const { addRole, roles } = useAuth();
  const [form, setForm] = useState({
    name: '',
    description: ''
  });
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const permissionsByGroup = useMemo(() => {
    const grouped: Record<string, typeof allPermissions> = {};
    allPermissions.forEach((p) => {
      if (!grouped[p.group]) grouped[p.group] = [];
      grouped[p.group].push(p);
    });
    return grouped;
  }, []);
  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((prev) =>
    prev.includes(permission) ?
    prev.filter((p) => p !== permission) :
    [...prev, permission]
    );
  };
  const toggleGroup = (groupPermissions: Permission[]) => {
    const allSelected = groupPermissions.every((p) =>
    selectedPermissions.includes(p)
    );
    if (allSelected) {
      setSelectedPermissions((prev) =>
      prev.filter((p) => !groupPermissions.includes(p))
      );
    } else {
      setSelectedPermissions((prev) =>
      Array.from(new Set([...prev, ...groupPermissions]))
      );
    }
  };
  const applyPreset = (preset: 'all' | 'none' | 'view-only') => {
    if (preset === 'all') {
      setSelectedPermissions(allPermissions.map((p) => p.key));
    } else if (preset === 'none') {
      setSelectedPermissions([]);
    } else if (preset === 'view-only') {
      setSelectedPermissions(
        allPermissions.
        filter((p) => p.key.startsWith('view:')).
        map((p) => p.key)
      );
    }
  };
  const isDuplicateName = roles.some(
    (r) => r.name.trim().toLowerCase() === form.name.trim().toLowerCase()
  );
  const canSave =
  form.name.trim().length > 0 &&
  !isDuplicateName &&
  selectedPermissions.length > 0;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    addRole({
      name: form.name.trim(),
      description: form.description.trim() || 'บทบาทที่กำหนดเอง',
      permissions: selectedPermissions
    });
    navigate('/admin/roles');
  };
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/roles"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center">
              <Shield className="mr-2 text-indigo-600" size={24} />
              เพิ่มบทบาทใหม่
            </h1>
            <p className="text-slate-500">
              สร้างบทบาทแบบกำหนดเองและเลือกสิทธิ์ที่ต้องการ
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/roles"
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
            
            ยกเลิก
          </Link>
          <button
            onClick={handleSubmit}
            disabled={!canSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center transition-colors shadow-sm">
            
            <Save size={18} className="mr-2" />
            บันทึกบทบาท
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Basic info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:sticky lg:top-20">
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              ข้อมูลบทบาท
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ชื่อบทบาท <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                  }
                  placeholder="เช่น หัวหน้าแคชเชียร์"
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm focus:ring-1 outline-none ${isDuplicateName && form.name.trim() ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`} />
                
                {isDuplicateName && form.name.trim() &&
                <p className="text-xs text-rose-500 mt-1.5">
                    ชื่อบทบาทนี้มีอยู่แล้วในระบบ
                  </p>
                }
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  คำอธิบาย
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                  }
                  placeholder="อธิบายขอบเขตหน้าที่ของบทบาทนี้"
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  สรุปสิทธิ์ที่เลือก
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {selectedPermissions.length}
                  <span className="text-base text-slate-400 font-medium">
                    {' '}
                    / {allPermissions.length}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  เทมเพลตเริ่มต้น
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => applyPreset('all')}
                    className="w-full text-left px-3 py-2 text-sm border border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    
                    เลือกทั้งหมด
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('view-only')}
                    className="w-full text-left px-3 py-2 text-sm border border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                    
                    เฉพาะดูข้อมูล (View Only)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('none')}
                    className="w-full text-left px-3 py-2 text-sm border border-slate-200 rounded-lg hover:border-rose-500 hover:bg-rose-50 transition-colors text-slate-600">
                    
                    ล้างทั้งหมด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Permissions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800">เลือกสิทธิ์</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                เลือกอย่างน้อย 1 สิทธิ์เพื่อสร้างบทบาท
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(permissionsByGroup).map(
                ([group, permissions]) => {
                  const groupKeys = permissions.map((p) => p.key);
                  const allChecked = groupKeys.every((k) =>
                  selectedPermissions.includes(k)
                  );
                  const someChecked = groupKeys.some((k) =>
                  selectedPermissions.includes(k)
                  );
                  return (
                    <div key={group} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-800">
                          {group}
                        </h3>
                        <button
                          type="button"
                          onClick={() => toggleGroup(groupKeys)}
                          className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${allChecked ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : someChecked ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}>
                          
                          {allChecked ?
                          'ยกเลิกทั้งหมด' :
                          someChecked ?
                          'เลือกทั้งกลุ่ม' :
                          'เลือกทั้งกลุ่ม'}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((p) => {
                          const checked = selectedPermissions.includes(p.key);
                          return (
                            <label
                              key={p.key}
                              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${checked ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                              
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'}`}>
                                
                                {checked && <Check size={12} strokeWidth={3} />}
                              </div>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => togglePermission(p.key)}
                                className="sr-only" />
                              
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
                    </div>);

                }
              )}
            </div>
          </div>
        </div>
      </form>
    </div>);

}