import React, { useEffect, useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { formatDate } from '../utils/format';
interface TopbarProps {
  onMenuClick: () => void;
}
export function Topbar({ onMenuClick }: TopbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-2 p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="เปิดเมนู">
          
          <Menu size={22} />
        </button>
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18} />
          
          <input
            type="text"
            placeholder="ค้นหาเมนู..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-48 lg:w-64" />
          
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <div className="text-xs sm:text-sm text-slate-600 hidden sm:block font-medium">
          {formatDate(currentTime.toISOString())}
        </div>

        <button className="relative text-slate-500 hover:text-indigo-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
            3
          </span>
        </button>
      </div>
    </header>);

}