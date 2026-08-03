import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Properties', path: '/admin/properties', icon: Building2 },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <aside className="w-64 h-full bg-slate-900 flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300">
      
      {/* Branding */}
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <Link to="/admin" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Smart<span className="text-[#2563eb]">Stay</span>
          </span>
          <span className="text-[9px] font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded uppercase tracking-widest mt-1 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        <div className="px-4 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200
              ${isActive 
                ? 'bg-[#2563eb]/10 text-[#2563eb]' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
        
        <div className="px-4 mt-8 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Preferences
        </div>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200
            ${isActive 
              ? 'bg-[#2563eb]/10 text-[#2563eb]' 
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }
          `}
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>

      {/* Bottom Profile / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
