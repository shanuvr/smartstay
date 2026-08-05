import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserCircle, 
  CreditCard, 
  Settings, 
  LifeBuoy
} from 'lucide-react';

const SuperAdminSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/super-admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Properties', path: '/super-admin/properties', icon: <Building2 size={20} /> },
    { name: 'Users', path: '/super-admin/users', icon: <Users size={20} /> },
    { name: 'Partners', path: '/super-admin/partners', icon: <UserCircle size={20} /> },
    { name: 'Finance & Subs', path: '/super-admin/finance', icon: <CreditCard size={20} /> },
    { name: 'Platform Settings', path: '/super-admin/settings', icon: <Settings size={20} /> },
    { name: 'Support Tickets', path: '/super-admin/support', icon: <LifeBuoy size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col shrink-0 hidden md:flex">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <h1 className="text-xl font-bold text-white tracking-tight">
          SmartStay <span className="font-light text-slate-400">Admin</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
              ${isActive 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }
            `}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-white font-semibold">All Systems Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
