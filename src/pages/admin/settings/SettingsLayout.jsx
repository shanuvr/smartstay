import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Building2, MapPin, Phone, ShieldCheck, CreditCard, Bell, Tag, ChevronDown, Camera, Package, Percent } from 'lucide-react';

const SettingsLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const [photosCount, setPhotosCount] = useState(() => {
    const saved = localStorage.getItem('smartstay_photos');
    if (saved) {
      try {
        return JSON.parse(saved).length;
      } catch (e) {}
    }
    return 4;
  });

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem('smartstay_photos');
      if (saved) {
        try {
          setPhotosCount(JSON.parse(saved).length);
        } catch (e) {}
      }
    };
    window.addEventListener('smartstay_photos_updated', updateCount);
    return () => window.removeEventListener('smartstay_photos_updated', updateCount);
  }, []);

  const sidebarLinks = [
    { name: 'Property Information', path: '/admin/settings', icon: Building2, end: true },
    { name: `Manage Photos (${photosCount})`, path: '/admin/settings/photos', icon: Camera },
    { name: 'Listing Badges', path: '/admin/settings/badges', icon: Tag },
    { name: 'Property Location', path: '/admin/settings/location', icon: MapPin },
    { name: 'Contact Info', path: '/admin/settings/contact', icon: Phone },
    { name: 'Policies', path: '/admin/settings/policies', icon: ShieldCheck },
    { name: 'Payment Options', path: '/admin/settings/payment', icon: CreditCard },
    { name: 'Commission & Payouts', path: '/admin/settings/plan', icon: Percent },
    { name: 'Notifications', path: '/admin/settings/notifications', icon: Bell },
  ];

  const currentActiveLink = sidebarLinks.find(link => {
    if (link.end) {
      return location.pathname === link.path;
    }
    return location.pathname.startsWith(link.path);
  }) || sidebarLinks[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 mb-20">
        
        {/* Settings Mobile Menu Dropdown Toggle */}
        <div className="md:hidden w-full relative">
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm font-bold text-slate-800 text-xs focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              {(() => {
                const ActiveIcon = currentActiveLink.icon;
                return <ActiveIcon size={16} className="text-blue-600" />;
              })()}
              <span>{currentActiveLink.name}</span>
            </div>
            <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                {sidebarLinks.map((link) => {
                  const LinkIcon = link.icon;
                  const isActive = link.end ? location.pathname === link.path : location.pathname.startsWith(link.path);
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      end={link.end}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors ${isActive ? 'bg-blue-50/50 text-blue-750 font-bold border-l-4 border-blue-600' : 'text-slate-655 hover:bg-slate-50'}`}
                    >
                      <LinkIcon size={16} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Settings Sidebar (Desktop only) */}
        <aside className="hidden md:block w-full md:w-64 lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Settings</h2>
              <p className="text-xs text-slate-500 mt-1">Manage your property details</p>
            </div>
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-l-4
                      ${isActive 
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700' 
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                        {link.name}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default SettingsLayout;
