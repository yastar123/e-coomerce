import { createFileRoute, Outlet } from '@tanstack/react-router';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#fafbfc]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


export const Route = createFileRoute('/admin')({ component: AdminLayout });
