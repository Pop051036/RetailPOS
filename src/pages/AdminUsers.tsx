import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Search, Shield, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { User, RoleId } from '../types';
import { formatDate } from '../utils/format';
import { getRoleColor } from '../utils/roleColors';
export function AdminUsers() {
  const { users, roles, addUser, updateUser, deleteUser, currentUser } =
  useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    roleId: 'cashier' as RoleId,
    status: 'active' as 'active' | 'inactive'
  });
  const filteredUsers = users.filter(
    (u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getRoleName = (roleId: RoleId) =>
  roles.find((r) => r.id === roleId)?.name || roleId;
  const openAddModal = () => {
    setEditingUser(null);
    setForm({
      name: '',
      email: '',
      roleId: 'cashier',
      status: 'active'
    });
    setIsModalOpen(true);
  };
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      status: user.status
    });
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editingUser) {
      updateUser(editingUser.id, form);
    } else {
      addUser(form);
    }
    setIsModalOpen(false);
  };
  const handleDelete = (user: User) => {
    if (window.confirm(`ยืนยันการลบผู้ใช้ "${user.name}"?`)) {
      deleteUser(user.id);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">จัดการผู้ใช้งาน</h1>
          <p className="text-slate-500">เพิ่ม แก้ไข ลบบัญชีพนักงานในระบบ</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center transition-colors shadow-sm">
          
          <UserPlus size={20} className="mr-2" />
          เพิ่มผู้ใช้ใหม่
        </button>
      </div>

      {/* Stat cards by role */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">ผู้ใช้ทั้งหมด</p>
          <p className="text-2xl font-bold text-slate-900">{users.length}</p>
        </div>
        {roles.map((role) =>
        <div
          key={role.id}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          
            <p className="text-sm text-slate-500 mb-1">{role.name}</p>
            <p className="text-2xl font-bold text-slate-900">
              {users.filter((u) => u.roleId === role.id).length}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20} />
            
            <input
              type="text"
              placeholder="ค้นหาชื่อหรืออีเมล..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
            
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ผู้ใช้งาน</th>
                <th className="px-6 py-4">บทบาท</th>
                <th className="px-6 py-4 text-center">สถานะ</th>
                <th className="px-6 py-4">เข้าใช้งานล่าสุด</th>
                <th className="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) =>
              <tr
                key={user.id}
                className="bg-white border-b border-slate-100 hover:bg-slate-50">
                
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mr-3 shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 flex items-center">
                          {user.name}
                          {user.id === currentUser.id &&
                        <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                              คุณ
                            </span>
                        }
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                    className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${getRoleColor(user.roleId).badge}`}>
                    
                      <Shield size={12} className="mr-1" />
                      {getRoleName(user.roleId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.status === 'active' ?
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        ใช้งานอยู่
                      </span> :

                  <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                        ปิดใช้งาน
                      </span>
                  }
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-xs">
                    {user.lastLogin ? formatDate(user.lastLogin) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                      onClick={() => openEditModal(user)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      
                        <Edit size={18} />
                      </button>
                      <button
                      onClick={() => handleDelete(user)}
                      disabled={user.id === currentUser.id}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                      
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {filteredUsers.length === 0 &&
              <tr>
                  <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-500">
                  
                    ไม่พบผู้ใช้งาน
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen &&
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">
                {editingUser ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้งานใหม่'}
              </h2>
              <button
              onClick={() => setIsModalOpen(false)}
              className="text-slate-400 hover:text-slate-600">
              
                <X size={22} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ชื่อ-นามสกุล <span className="text-rose-500">*</span>
                </label>
                <input
                type="text"
                value={form.name}
                onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
                }
                placeholder="ชื่อ นามสกุล"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  อีเมล <span className="text-rose-500">*</span>
                </label>
                <input
                type="email"
                value={form.email}
                onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
                }
                placeholder="user@example.com"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  บทบาท <span className="text-rose-500">*</span>
                </label>
                <select
                value={form.roleId}
                onChange={(e) =>
                setForm({
                  ...form,
                  roleId: e.target.value as RoleId
                })
                }
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                
                  {roles.map((role) =>
                <option key={role.id} value={role.id}>
                      {role.name} — {role.description}
                    </option>
                )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  สถานะ
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                    <input
                    type="radio"
                    checked={form.status === 'active'}
                    onChange={() =>
                    setForm({
                      ...form,
                      status: 'active'
                    })
                    }
                    className="accent-indigo-600" />
                  
                    <span className="text-sm">ใช้งานอยู่</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 p-3 border border-slate-200 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                    <input
                    type="radio"
                    checked={form.status === 'inactive'}
                    onChange={() =>
                    setForm({
                      ...form,
                      status: 'inactive'
                    })
                    }
                    className="accent-indigo-600" />
                  
                    <span className="text-sm">ปิดใช้งาน</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-white transition-colors">
              
                ยกเลิก
              </button>
              <button
              onClick={handleSave}
              disabled={!form.name.trim() || !form.email.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg font-medium transition-colors shadow-sm">
              
                บันทึก
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

}