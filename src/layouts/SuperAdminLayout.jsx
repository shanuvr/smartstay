import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from '../components/super-admin/SuperAdminSidebar';
import SuperAdminNavbar from '../components/super-admin/SuperAdminNavbar';

const SuperAdminLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar for Desktop */}
      <SuperAdminSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Navbar */}
        <SuperAdminNavbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 p-4 md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default SuperAdminLayout;
