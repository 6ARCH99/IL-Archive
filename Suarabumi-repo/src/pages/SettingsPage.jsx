import React from 'react';

// TAMBAHKAN: onGoToPreference dan onGoToHelp ke dalam props
const SettingsPage = ({ 
  onLogout, 
  onChangePassword, 
  onGoToNotification, 
  onGoToPreference, 
  onGoToHelp 
}) => {
  const settingsMenus = [
    {
      id: 'password',
      title: 'Ubah Password',
      desc: 'Kelola keamanan akun',
      icon: '🔒',
      bgColor: 'bg-green-50',
      onClick: onChangePassword 
    },
    {
      id: 'notification',
      title: 'Notifikasi',
      desc: 'Atur preferensi pemberitahuan',
      icon: '🔔',
      bgColor: 'bg-orange-50',
      onClick: onGoToNotification 
    },
    {
      id: 'preference',
      title: 'Preferensi',
      desc: 'Sesuaikan pengalaman Anda',
      icon: '⚖️',
      bgColor: 'bg-blue-50',
      // UBAH: Sekarang menggunakan navigasi asli
      onClick: onGoToPreference 
    },
    {
      id: 'help',
      title: 'Bantuan',
      desc: 'FAQ dan dukungan',
      icon: '❓',
      bgColor: 'bg-purple-50',
      // UBAH: Sekarang menggunakan navigasi asli
      onClick: onGoToHelp 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[#1A3022] mb-2 font-serif">Pengaturan</h1>
          <p className="text-gray-500 text-sm">Kelola akun dan preferensi aplikasi kamu</p>
        </header>

        {/* Grid Menu Pengaturan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {settingsMenus.map((menu) => (
            <button 
              key={menu.id}
              onClick={menu.onClick} 
              className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md hover:border-green-100 transition-all group text-left w-full active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${menu.bgColor} rounded-2xl flex items-center justify-center text-xl`}>
                  {menu.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#1A3022] text-sm group-hover:text-green-700 transition-colors">
                    {menu.title}
                  </h3>
                  <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{menu.desc}</p>
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-[#1A3022] group-hover:translate-x-1 transition-all text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </span>
            </button>
          ))}
        </div>

        {/* Bagian Akun */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#1A3022] font-serif px-2">Akun</h2>
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A3022] text-sm">Status Akun</h4>
                  <p className="text-gray-400 text-xs">Aktif sejak Januari 2026</p>
                </div>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-green-100">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Verified
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Keluar dari Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;