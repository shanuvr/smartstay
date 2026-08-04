import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogOut, ChevronDown, Menu, X } from 'lucide-react';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const navItems = [
    { name: 'Performance', path: '/admin/dashboard' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Rates & Availability', path: '/admin/rates' },
    { 
      name: 'Property', 
      path: '/admin',
      dropdown: [
        { name: 'Listings', path: '/admin' },
        { name: 'Rooms', path: '/admin/rooms' },
        { name: 'Facilities', path: '/admin/facilities' }
      ]
    }, 
    { name: 'Finance', path: '/admin/finance' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <>
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-50 shadow-sm">
      
      {/* Logo and Nav Links */}
      <div className="flex items-center gap-2 md:gap-10 h-full">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/admin" className="flex items-center gap-3">
           <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
              SmartStay <span className="font-normal text-slate-500">Partner Portal</span>
           </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex h-full">
          {navItems.map((item) => (
            <div key={item.name} className="relative h-full flex items-center group">
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => `
                  h-full flex items-center px-4 text-[14.5px] font-medium transition-colors cursor-pointer
                  ${isActive 
                    ? 'text-blue-600' 
                    : 'text-slate-500 hover:text-slate-800'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {item.dropdown && <ChevronDown size={14} className="ml-1 opacity-70" />}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-blue-600 rounded-t-md"></span>
                    )}
                  </>
                )}
              </NavLink>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div className="absolute top-full left-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {item.dropdown.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.path}
                        end={subItem.path === '/admin'}
                        className={({ isActive }) => `
                          block px-5 py-2.5 text-[14px] font-medium transition-colors
                          ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}
                        `}
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right side (Profile / Logout) */}
      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 md:pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Admin User</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Super Admin</p>
          </div>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 text-xs md:text-sm">
            AU
          </div>
        </div>
        <button className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full" title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </header>

    {/* Mobile Menu Drawer Overlay */}
    {isMobileMenuOpen && (
      <>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[99] md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer Panel */}
        <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-white z-[100] md:hidden flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
          {/* Drawer Header */}
          <div className="h-16 border-b border-slate-100 flex items-center justify-between px-5">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-800">SmartStay</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown;
              const isExpanded = expandedMenu === item.name;

              return (
                <div key={item.name} className="flex flex-col">
                  {hasDropdown ? (
                    // Toggle button for dropdown items
                    <button
                      onClick={() => setExpandedMenu(isExpanded ? null : item.name)}
                      className="w-full flex items-center justify-between px-6 py-3 text-[15px] font-medium text-slate-600 hover:bg-slate-50 transition-colors border-b border-slate-50/50"
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-180 text-blue-600' : ''}`} 
                      />
                    </button>
                  ) : (
                    // Standard NavLink
                    <NavLink
                      to={item.path}
                      end={item.path === '/admin'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        block px-6 py-3 text-[15px] font-medium transition-colors border-b border-slate-50/50
                        ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}
                      `}
                    >
                      {item.name}
                    </NavLink>
                  )}

                  {/* Dropdown items */}
                  {hasDropdown && isExpanded && (
                    <div className="bg-slate-50/60 flex flex-col py-1.5 border-b border-slate-100">
                      {item.dropdown.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.path}
                          end={subItem.path === '/admin'}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) => `
                            block px-10 py-2.5 text-[14px] font-medium transition-colors
                            ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}
                          `}
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer (Sign out etc.) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                AU
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-800">Admin User</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Super Admin</p>
              </div>
            </div>
            <button 
              className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </>
    )}
    </>
  );
};

export default AdminNavbar;
