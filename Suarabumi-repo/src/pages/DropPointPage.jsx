import React, { useState } from 'react';

const DropPointPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  // Tambahan state untuk View Mode
  const [viewMode, setViewMode] = useState('daftar'); 

  const materials = [
    { id: 'all', label: 'Semua', icon: '♻️' },
    { id: 'plastic', label: 'Plastik', icon: '🥤' },
    { id: 'paper', label: 'Kertas', icon: '📄' },
    { id: 'metal', label: 'Logam', icon: '⚙️' },
    { id: 'glass', label: 'Kaca', icon: '🍾' },
    { id: 'electronic', label: 'Elektronik', icon: '🔌' },
  ];

  const dropPoints = [
    {
      id: 1,
      name: "Drop Point Sudirman Central",
      status: "Buka",
      rating: 4.8,
      reviews: 127,
      address: "Jl. Jenderal Sudirman No. 52-53, Jakarta Pusat",
      distance: "0.8 km",
      hours: "07:00 - 20:00",
      phone: "+62 21 5789 1234",
      materials: ["Plastik", "Kertas", "Logam", "Elektronik"]
    },
    {
      id: 2,
      name: "Bank Sampah Melati Bersih",
      status: "Buka",
      rating: 4.6,
      reviews: 89,
      address: "Jl. Melati Raya No. 15, Kebayoran Baru",
      distance: "1.2 km",
      hours: "08:00 - 17:00",
      phone: "+62 21 7234 5678",
      materials: ["Plastik", "Kertas", "Kaca"]
    },
    {
      id: 3,
      name: "DP Senayan Park",
      status: "Buka",
      rating: 4.9,
      reviews: 203,
      address: "Taman Senayan, Gelora Bung Karno",
      distance: "2.1 km",
      hours: "06:00 - 18:00",
      phone: "+62 21 5789 9012",
      materials: ["Plastik", "Kertas", "Logam", "Kaca"]
    },
    {
      id: 4,
      name: "Waste Collection Blok M",
      status: "Buka",
      rating: 4.7,
      reviews: 156,
      address: "Jl. Blok M No. 88, Kebayoran Baru",
      distance: "2.8 km",
      hours: "09:00 - 21:00",
      phone: "+62 21 7234 1111",
      materials: ["Plastik", "Logam", "Elektronik"]
    }
  ];

  // TAMBAHAN: Logika Filter & Search
  const filteredPoints = dropPoints.filter(dp => {
    const matchesSearch = dp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dp.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMaterial = activeFilter === "Semua" || dp.materials.includes(activeFilter);
    return matchesSearch && matchesMaterial;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-10 text-left">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A3022] font-serif mb-2">Drop Point Finder</h1>
          <p className="text-gray-500">Temukan titik pengumpulan sampah terdekat dari lokasimu dengan mudah.</p>
        </div>

        {/* Search and Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama, alamat, atau wilayah..." 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-[#1A3022]/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-[#1A3022] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#2d4a37] transition-all">
            📍 Lokasi Saat Ini
          </button>
        </div>

        {/* Filter Material */}
        <div className="mb-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Filter Berdasarkan Material:</p>
          <div className="flex flex-wrap gap-3">
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveFilter(m.label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  activeFilter === m.label 
                  ? 'bg-[#1A3022] text-white border-[#1A3022]' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                }`}
              >
                <span>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-[2]">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm font-bold text-[#1A3022]">{filteredPoints.length} Drop Point ditemukan</p>
              <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                <button 
                  onClick={() => setViewMode('peta')}
                  className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${viewMode === 'peta' ? 'bg-[#1A3022] text-white' : 'text-gray-400'}`}
                >
                  PETA
                </button>
                <button 
                  onClick={() => setViewMode('daftar')}
                  className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${viewMode === 'daftar' ? 'bg-[#1A3022] text-white' : 'text-gray-400'}`}
                >
                  DAFTAR
                </button>
              </div>
            </div>

            {/* TAMBAHAN: Kondisional Rendering antara Daftar dan Peta */}
            {viewMode === 'daftar' ? (
              <div className="space-y-4">
                {filteredPoints.map((dp) => (
                  <div key={dp.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-[#1A3022]">{dp.name}</h3>
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{dp.status}</span>
                        </div>
                        <p className="text-xs text-gray-400">{dp.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-orange-400 text-sm font-bold">⭐ {dp.rating} <span className="text-gray-300 font-normal">({dp.reviews})</span></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase">Jarak</p>
                        <p className="text-sm font-bold text-[#1A3022]">📍 {dp.distance}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase">Jam Buka</p>
                        <p className="text-sm font-bold text-[#1A3022]">🕒 {dp.hours}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase">Telepon</p>
                        <p className="text-sm font-bold text-[#1A3022]">📞 {dp.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex flex-wrap gap-2">
                        {dp.materials.map((mat, i) => (
                          <span key={i} className="text-[10px] font-bold bg-[#F5F5F0] text-[#1A3022] px-3 py-1 rounded-full">{mat}</span>
                        ))}
                      </div>
                      <button className="text-xs font-bold bg-[#1A3022] text-white px-6 py-2.5 rounded-xl hover:opacity-90">
                        Lihat Petunjuk Arah
                      </button>
                    </div>
                  </div>
                ))}
                {filteredPoints.length === 0 && (
                  <div className="py-20 text-center text-gray-400">Data tidak ditemukan.</div>
                )}
              </div>
            ) : (
              // Tampilan Placeholder Peta
              <div className="w-full h-[600px] bg-[#e5e5df] rounded-[32px] border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-[#1A3022] font-bold">Tampilan Peta</p>
                  <p className="text-xs text-gray-500">Integrasikan Google Maps API di sini</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Highlight */}
          <div className="flex-1">
            <div className="bg-[#68A67D] rounded-[32px] p-8 text-white sticky top-6 shadow-xl shadow-green-900/10">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Terdekat dari Kamu</p>
              <h2 className="text-2xl font-bold mb-6 font-serif">Drop Point Sudirman Central</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <span className="mt-1">🕒</span>
                  <div>
                    <p className="text-[10px] font-bold opacity-70 uppercase">Jam Operasional</p>
                    <p className="text-sm font-bold">07:00 - 20:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1">📍</span>
                  <div>
                    <p className="text-[10px] font-bold opacity-70 uppercase">Jarak</p>
                    <p className="text-sm font-bold">0.8 km dari lokasimu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-1">🏠</span>
                  <div>
                    <p className="text-[10px] font-bold opacity-70 uppercase">Alamat</p>
                    <p className="text-sm font-medium leading-relaxed">Jl. Jenderal Sudirman No. 52-53, Jakarta Pusat</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-bold opacity-70 uppercase mb-3">Menerima Material</p>
                <div className="flex flex-wrap gap-2">
                  {["Plastik", "Kertas", "Logam", "Elektronik"].map((m, i) => (
                    <span key={i} className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#1A3022] text-white py-4 rounded-2xl font-bold hover:bg-[#122017] transition-all shadow-lg active:scale-95">
                Petunjuk Arah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropPointPage;