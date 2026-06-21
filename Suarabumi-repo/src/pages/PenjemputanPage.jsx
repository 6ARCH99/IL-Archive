import React, { useState } from 'react';

const PenjemputanPage = () => {
  // State untuk mengontrol tampilan (false = List Jadwal, true = Form Baru)
  const [isAddingNew, setIsAddingNew] = useState(false);

  const jadwalAktif = [
    {
      id: 1,
      status: "Terjadwal",
      tanggal: "01 Apr 2026",
      waktu: "10:00 - 12:00",
      lokasi: "Jl. Melati No. 15, Jakarta Selatan",
      estimasi: "8 kg"
    },
    {
      id: 2,
      status: "Terjadwal",
      tanggal: "05 Apr 2026",
      waktu: "14:00 - 16:00",
      lokasi: "Jl. Melati No. 15, Jakarta Selatan",
      estimasi: "5 kg"
    },
    {
      id: 3,
      status: "Terjadwal",
      tanggal: "01 Apr 2026",
      waktu: "10:00 - 12:00",
      lokasi: "Jl. Melati No. 15, Jakarta Selatan",
      estimasi: "8 kg"
    },
    {
      id: 4,
      status: "Terjadwal",
      tanggal: "05 Apr 2026",
      waktu: "14:00 - 16:00",
      lokasi: "Jl. Melati No. 15, Jakarta Selatan",
      estimasi: "5 kg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-10">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#1A3022] font-serif mb-2">Penjemputan Sampah</h1>
            <p className="text-gray-500">Jadwalkan atau kelola penjemputan sampah terpilahmu.</p>
          </div>
          
          {/* Tombol Buat Jadwal: Hanya muncul jika sedang tidak mengisi form */}
          {!isAddingNew && (
            <button 
              onClick={() => setIsAddingNew(true)}
              className="bg-[#1A3022] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#2d4a37] transition-all shadow-md"
            >
              <span className="text-xl">+</span> Buat Jadwal Baru
            </button>
          )}
        </div>

        {/* --- KONDISI 1: FORM JADWAL BARU (Muncul saat Klik 'Buat Jadwal Baru') --- */}
        {isAddingNew && (
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold text-[#1A3022] mb-8">Jadwal Penjemputan Baru</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-[#1A3022] mb-2">Pilih Tanggal</label>
                <input type="date" className="w-full bg-[#F9F9F6] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1A3022]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A3022] mb-2">Pilih Waktu</label>
                <input type="time" className="w-full bg-[#F9F9F6] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1A3022]" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#1A3022] mb-2">Alamat Penjemputan</label>
              <textarea 
                placeholder="Masukkan alamat lengkap..." 
                className="w-full bg-[#F9F9F6] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1A3022] h-24"
              ></textarea>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-[#1A3022] mb-2">Estimasi Berat (kg)</label>
              <input 
                type="number" 
                placeholder="Contoh: 5" 
                className="w-full bg-[#F9F9F6] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1A3022]" 
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => setIsAddingNew(false)}
                className="flex-[2] bg-[#1A3022] text-white py-4 rounded-xl font-bold hover:bg-[#2d4a37] transition-all"
              >
                Konfirmasi Jadwal
              </button>
              <button 
                onClick={() => setIsAddingNew(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-500 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* --- KONDISI 2: DAFTAR JADWAL AKTIF --- */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-10">
          <h2 className="text-2xl font-bold text-[#1A3022] text-center mb-10 font-serif">Jadwal Aktif</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jadwalAktif.map((item) => (
              <div key={item.id} className="bg-[#F9F9F6] border border-gray-100 rounded-3xl p-6 relative hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#E9F5EF] text-[#2D4A37] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.status}
                  </span>
                  <button className="text-red-400 hover:text-red-600 transition-colors">🗑️</button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-green-700">📅</span>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Tanggal & Waktu</p>
                      <p className="text-sm font-bold text-[#1A3022]">{item.tanggal}, {item.waktu}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-green-700">📍</span>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Lokasi</p>
                      <p className="text-sm font-medium text-gray-600 leading-tight">{item.lokasi}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-green-700">⚖️</span>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Estimasi Berat</p>
                      <p className="text-sm font-bold text-[#1A3022]">{item.estimasi}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#1A3022] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#2d4a37] transition-all">
                  Ubah Jadwal
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#E9F5EF] border border-[#CDE5D9] rounded-[24px] p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="font-bold text-[#2D4A37]">Tips Penjemputan Lancar</h3>
          </div>
          <ul className="space-y-3 text-sm text-[#2D4A37] opacity-80 list-disc list-inside ml-2">
            <li>Pastikan sampah sudah dipilah sesuai kategori (Plastik, Kertas, Logam, Kaca)</li>
            <li>Bersihkan sampah dari sisa makanan atau cairan</li>
            <li>Siapkan sampah di lokasi yang mudah dijangkau</li>
            <li>Konfirmasi 1 hari sebelumnya jika ada perubahan jadwal</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PenjemputanPage;