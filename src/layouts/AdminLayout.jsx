import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fa] overflow-hidden font-sans text-slate-900">
      
      <AdminNavbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
