import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar - Fixed on left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header (Optional, for mobile menu toggle or profile info) */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-end px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">Admin User</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold shadow-sm">
              AU
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
