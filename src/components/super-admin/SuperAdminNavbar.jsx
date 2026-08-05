import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, Menu, X, Bell } from 'lucide-react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserCircle, 
  CreditCard, 
  Settings, 
  LifeBuoy
} from 'lucide-react';

const SuperAdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm relative z-40 w-full">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={22} />
          </button>
          
          <div className="md:hidden">
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              SmartStay <span className="font-normal text-slate-500">Admin</span>
            </h1>
          </div>
        </div>

        {/* Right side (Profile / Logout) */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="relative text-slate-500 hover:text-blue-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-4 md:pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Super Admin</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Platform Owner</p>
            </div>
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm text-xs md:text-sm">
              SA
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full" title="Sign Out">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[99] md:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-slate-900 text-slate-300 z-[100] md:hidden flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-5">
              <h1 className="text-xl font-bold text-white tracking-tight">
                SmartStay <span className="font-light text-slate-400">Admin</span>
              </h1>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SuperAdminNavbar;
