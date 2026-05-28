import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MonitorSmartphone,
  ShoppingCart,
  Package,
  Tags,
  ArrowRightLeft,
  BarChart3,
  Store,
  X,
  Users,
  Shield,
  ChevronDown } from
'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types';
import { getRoleColor } from '../utils/roleColors';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  permission: Permission;
  badge?: number;
  section?: 'main' | 'admin';
}
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { totalQty } = useCart();
  const { currentUser, users, roles, setCurrentUserById, hasPermission } =
  useAuth();
  const currentRole = roles.find((r) => r.id === currentUser.roleId);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navItems: NavItem[] = [
  {
    path: '/',
    name: 'แดชบอร์ด',
    icon: <LayoutDashboard size={20} />,
    permission: 'view:dashboard',
    section: 'main'
  },
  {
    path: '/pos',
    name: 'ขายหน้าร้าน (POS)',
    icon: <MonitorSmartphone size={20} />,
    permission: 'view:pos',
    section: 'main'
  },
  {
    path: '/cart',
    name: 'ตะกร้าสินค้า',
    icon: <ShoppingCart size={20} />,
    permission: 'view:cart',
    badge: totalQty,
    section: 'main'
  },
  {
    path: '/products',
    name: 'จัดการสินค้า',
    icon: <Package size={20} />,
    permission: 'view:products',
    section: 'main'
  },
  {
    path: '/categories',
    name: 'หมวดหมู่สินค้า',
    icon: <Tags size={20} />,
    permission: 'view:categories',
    section: 'main'
  },
  {
    path: '/stock',
    name: 'จัดการสต็อก',
    icon: <ArrowRightLeft size={20} />,
    permission: 'view:stock',
    section: 'main'
  },
  {
    path: '/reports',
    name: 'รายงานการขาย',
    icon: <BarChart3 size={20} />,
    permission: 'view:reports',
    section: 'main'
  },
  {
    path: '/admin/users',
    name: 'ผู้ใช้งาน',
    icon: <Users size={20} />,
    permission: 'manage:users',
    section: 'admin'
  },
  {
    path: '/admin/roles',
    name: 'บทบาทและสิทธิ',
    icon: <Shield size={20} />,
    permission: 'manage:roles',
    section: 'admin'
  }];

  const mainItems = navItems.filter(
    (i) => i.section === 'main' && hasPermission(i.permission)
  );
  const adminItems = navItems.filter(
    (i) => i.section === 'admin' && hasPermission(i.permission)
  );
  const renderNavLink = (item: NavItem) =>
  <NavLink
    key={item.path}
    to={item.path}
    end={item.path === '/'}
    onClick={onClose}
    className={({ isActive }) =>
    `flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors duration-200 ${isActive ? 'bg-indigo-600/10 text-indigo-400 font-medium' : 'hover:bg-slate-800 hover:text-white'}`
    }>
    
      <span className="flex items-center">
        <span className="mr-3">{item.icon}</span>
        {item.name}
      </span>
      {item.badge && item.badge > 0 ?
    <span className="bg-indigo-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
          {item.badge}
        </span> :
    null}
    </NavLink>;

  return (
    <>
      {isOpen &&
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden" />

      }

      <aside
        className={`w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center">
            <Store className="text-indigo-500 mr-3" size={24} />
            <span className="text-white font-bold text-lg tracking-wide">
              RetailPOS
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
            aria-label="ปิดเมนู">
            
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            เมนูหลัก
          </div>
          {mainItems.map(renderNavLink)}

          {adminItems.length > 0 &&
          <>
              <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                ผู้ดูแลระบบ
              </div>
              {adminItems.map(renderNavLink)}
            </>
          }
        </nav>

        <div className="p-3 border-t border-slate-800 shrink-0 relative">
          {showUserMenu &&
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
              <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-700">
                สลับบัญชี (สำหรับทดสอบสิทธิ์)
              </div>
              <div className="max-h-64 overflow-y-auto">
                {users.map((u) => {
                const role = roles.find((r) => r.id === u.roleId);
                const isActive = u.id === currentUser.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUserById(u.id);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 flex items-center hover:bg-slate-700/50 transition-colors ${isActive ? 'bg-slate-700/30' : ''}`}>
                    
                      <div
                      className={`w-7 h-7 rounded-full ${getRoleColor(u.roleId).avatar} flex items-center justify-center text-white font-bold text-xs mr-2.5 shrink-0`}>
                      
                        {u.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {u.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {role?.name}
                        </p>
                      </div>
                      {isActive &&
                    <span className="text-[10px] text-indigo-400 font-bold ml-2">
                          ปัจจุบัน
                        </span>
                    }
                    </button>);

              })}
              </div>
            </div>
          }

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center p-2 rounded-lg hover:bg-slate-800 transition-colors">
            
            <div
              className={`w-9 h-9 rounded-full ${getRoleColor(currentUser.roleId).avatar} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              
              {currentUser.name.charAt(0)}
            </div>
            <div className="ml-3 flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {currentRole?.name}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            
          </button>
        </div>
      </aside>
    </>);

}