

import { Bell, Settings, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AdminHeader() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[#fafbfc]/85 border-b border-[#e8ecf1]">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Left - Title */}
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Admin Panel</h1>
          <p className="text-sm text-[#94a3b8]">Kelola konten dan data Aerova Official</p>
        </div>

        {/* Right - Icons & Profile */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-white transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00B4E6] rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 rounded-full text-[#94a3b8] hover:text-[#00B4E6] hover:bg-white transition-colors">
            <Settings className="w-6 h-6" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 text-[#1e293b] hover:bg-white rounded-full border border-transparent hover:border-[#e8ecf1] transition-colors"
            >
              <div className="w-8 h-8 bg-[#00B4E6]/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#00B4E6]" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">Admin</span>
              <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            </button>

            {/* Dropdown Menu */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-[#e8ecf1] py-2 z-50">
                <div className="px-4 py-3 border-b border-[#e8ecf1]">
                  <p className="font-semibold text-[#1e293b]">Admin Aerova</p>
                  <p className="text-xs text-[#94a3b8]">admin@aerova.co.id</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-[#1e293b] hover:bg-[#fafbfc]">
                  Profil
                </button>
                <button className="w-full text-left px-4 py-2 text-[#1e293b] hover:bg-[#fafbfc]">
                  Pengaturan
                </button>
                <div className="border-t border-[#e8ecf1] mt-2 pt-2">
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
