import React, { useState } from 'react';

// Pindahkan ToggleSwitch ke luar agar tidak re-render secara tidak perlu
const ToggleSwitch = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 focus:outline-none ${
      active ? 'bg-green-600' : 'bg-gray-300'
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
        active ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

const NotificationPage = ({ onBack }) => {
  const [notifications, setNotifications] = useState({
    poinMasuk: true,
    penjemputan: true,
    challengeBaru: true,
    rewardTersedia: false,
    newsletter: true,
    promo: false,
  });

  const toggleStatus = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Tombol Kembali */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3022] transition-colors mb-8 group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </div>
          <span className="font-medium">Kembali</span>
        </button>

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[#1A3022] mb-2 font-serif">Notifikasi</h1>
          <p className="text-gray-500 text-sm">Kelola preferensi pemberitahuan kamu</p>
        </header>

        <div className="space-y-6">
          {/* Section Pemberitahuan Push */}
          <section className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </div>
              <h2 className="text-lg font-bold text-[#1A3022]">Pemberitahuan Push</h2>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'poinMasuk', title: 'Poin Masuk', desc: 'Notifikasi saat poin berhasil ditambahkan' },
                { id: 'penjemputan', title: 'Penjemputan', desc: 'Reminder jadwal penjemputan sampah' },
                { id: 'challengeBaru', title: 'Challenge Baru', desc: 'Info challenge dan kompetisi mingguan' },
                { id: 'rewardTersedia', title: 'Reward Tersedia', desc: 'Pemberitahuan reward yang bisa ditukar' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[#F9F9F6] rounded-2xl border border-gray-50 hover:border-gray-200 transition-all">
                  <div>
                    <h4 className="font-bold text-[#1A3022] text-sm">{item.title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <ToggleSwitch 
                    active={notifications[item.id]} 
                    onClick={() => toggleStatus(item.id)} 
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Section Email */}
          <section className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <h2 className="text-lg font-bold text-[#1A3022]">Email</h2>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'newsletter', title: 'Newsletter Mingguan', desc: 'Ringkasan aktivitas dan tips lingkungan' },
                { id: 'promo', title: 'Promo & Penawaran', desc: 'Info promo khusus dan bonus poin' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[#F9F9F6] rounded-2xl border border-gray-50 hover:border-gray-200 transition-all">
                  <div>
                    <h4 className="font-bold text-[#1A3022] text-sm">{item.title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <ToggleSwitch 
                    active={notifications[item.id]} 
                    onClick={() => toggleStatus(item.id)} 
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;