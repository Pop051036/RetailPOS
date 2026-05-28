import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
export function Layout() {
  const location = useLocation();
  const isPOS = location.pathname === '/pos';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        {!isPOS && <Topbar onMenuClick={() => setIsSidebarOpen(true)} />}
        {isPOS &&
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-20 p-2 bg-white rounded-lg shadow-md border border-slate-200 text-slate-600 hover:text-slate-900"
          aria-label="เปิดเมนู">
          
            <Menu size={20} />
          </button>
        }
        <main
          className={`flex-1 ${isPOS ? 'p-0 h-screen overflow-hidden' : 'p-4 sm:p-6 overflow-auto'}`}>
          
          <Outlet />
        </main>
      </div>
    </div>);

}