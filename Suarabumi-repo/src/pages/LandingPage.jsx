import React from 'react';
// Pastikan path impor logo sesuai dengan struktur folder Anda
import LogoDaurin from '../assets/Logo Daurin.jpeg'; 

// Komponen Kecil untuk Kartu Fitur (Sesuai Brand Identity v1.0)
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition-all group">
    <div className="w-12 h-12 bg-[#E7F7EF] rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-[#1A3022] mb-2">{title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

// Komponen untuk Kartu Cara Kerja (Berdasarkan gambar terbaru)
const StepCard = ({ number, tag, title, desc }) => (
  <div className="bg-white p-10 rounded-[32px] shadow-sm relative overflow-hidden group hover:shadow-md transition-all border border-gray-50">
    <div className="relative z-10">
      <span className="text-[#2D6A4F] font-bold text-[10px] uppercase tracking-widest opacity-60 mb-4 block">
        {tag}
      </span>
      <h4 className="text-2xl font-bold text-[#1A3022] mb-3">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
        {desc}
      </p>
    </div>
    {/* Angka besar di latar belakang kartu */}
    <span className="absolute bottom-[-10px] right-6 text-8xl font-bold text-[#E7F7EF] leading-none select-none group-hover:text-[#D5EDE0] transition-colors">
      {number}
    </span>
  </div>
);

// Komponen Kartu Review (Berdasarkan image_495f7f.png)
const ReviewCard = ({ name, location, amount, text }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-[#A8D5BA] rounded-full"></div>
      <div>
        <h5 className="text-sm font-bold text-[#1A3022]">{name}, {location}</h5>
        <p className="text-[#B2904C] text-[10px] font-bold">Rp {amount} 💰</p>
      </div>
    </div>
    <p className="text-gray-500 text-xs leading-relaxed italic font-medium">
      "{text}"
    </p>
  </div>
);

// Perbaikan: Menambahkan onGoToRegister ke dalam props agar bisa diakses
const LandingPage = ({ onLogin, onGoToRegister }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans scroll-smooth">
      
      {/* 1. NAVBAR LANDING */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Penggantian Logo ke Image Melingkar */}
          <img 
            src={LogoDaurin} 
            alt="Logo" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <span className="text-xl font-bold text-[#1A3022]">
            Daurin<span className="text-orange-500">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-bold text-gray-500 tracking-wider">
          <a href="#fitur" className="hover:text-[#1A3022] transition-colors uppercase">Fitur</a>
          <a href="#cara-kerja" className="hover:text-[#1A3022] transition-colors uppercase">Cara Kerja</a>
          <a href="#review" className="hover:text-[#1A3022] transition-colors uppercase">Review</a>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onLogin}
            className="text-sm font-bold text-[#1A3022] px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all"
          >
            Masuk
          </button>
        
          <button 
            onClick={onGoToRegister}
            className="bg-[#1A3022] text-white text-sm font-bold px-8 py-2.5 rounded-full hover:opacity-90 transition-all shadow-lg"
          >
            Daftar
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-[#1A3022] text-white pt-24 pb-32 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10">
            <span className="text-[10px] font-bold tracking-widest uppercase">🍃 Aksi Iklim Dimulai Hari Ini</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
            Pilah Sampah, Dapat <br />
            <span className="text-[#FFB800] italic font-serif">Reward</span>, Jaga Bumi
          </h1>
          <p className="text-lg md:text-xl opacity-70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Jadikan setiap sampah yang kamu pilah sebagai aksi nyata melawan perubahan iklim, dan dapatkan reward langsung ke e-wallet-mu.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button onClick={onGoToRegister} className="bg-[#FFB800] text-[#1A3022] font-black px-10 py-5 rounded-full text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 group">
              Mulai Sekarang <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <p className="text-xs font-medium opacity-50">Bergabung dengan <span className="text-[#FFB800] font-bold">12.400+</span> pengguna aktif</p>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="bg-[#14261B] border-t border-white/5 py-24 px-6 text-center text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="group">
            <h2 className="text-5xl font-bold text-[#FFB800] mb-4">83.75%</h2>
            <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Rumah tangga belum memilah sampah</p>
          </div>
          <div className="group border-y md:border-y-0 md:border-x border-white/10 py-10 md:py-0">
            <h2 className="text-5xl font-bold text-[#FFB800] mb-4">12.5%</h2>
            <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Sampah didaur ulang secara aktif</p>
          </div>
          <div className="group">
            <h2 className="text-5xl font-bold text-[#FFB800] mb-4">25×</h2>
            <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Gas CH₄ lebih merusak dibanding CO₂</p>
          </div>
        </div>
      </section>

      {/* 4. FITUR SECTION */}
      <section id="fitur" className="py-24 px-6 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2D6A4F] font-bold text-[10px] uppercase tracking-[0.2em] mb-3">Kenapa Tunas?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A3022] mb-4">Fitur yang Bikin Bedanya</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="💰" title="Reward E-Wallet" desc="Poin yang bisa ditukar ke GoPay, OVO, Dana, atau ShopeePay" />
            <FeatureCard icon="📈" title="Lacak CO₂" desc="Lihat berapa kilogram CO₂ yang sudah kamu selamatkan secara real-time" />
            <FeatureCard icon="📍" title="Drop Point" desc="Temukan titik pengumpulan sampah terdekat dengan peta interaktif" />
            <FeatureCard icon="📅" title="Jadwal Fleksibel" desc="Atur jadwal penjemputan sampah langsung dari rumah Anda" />
            <FeatureCard icon="🎁" title="Hadiah Mingguan" desc="Ikuti tantangan mingguan dan raih hadiah eksklusif" />
            <FeatureCard icon="🌿" title="Komunitas" desc="Bergabung dengan ribuan pengguna lain yang peduli bumi" />
          </div>
        </div>
      </section>

      {/* 5. VALUE PROPOSITION */}
      <section className="pb-32 px-6 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto border-2 border-dashed border-blue-200 rounded-[48px] p-8 md:p-16">
          <div className="text-center mb-16">
            <p className="text-[#2D6A4F] font-bold text-[10px] uppercase tracking-[0.2em] mb-3">KENAPA TUNAS?</p>
            <h2 className="text-4xl md:text-6xl font-bold text-[#1A3022] font-serif">Paling Untung, Paling Mudah</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon="💸" title="Rate Tertinggi" desc="Rp 10.000+/kg, 2x lebih tinggi dari bank sampah biasa" />
            <FeatureCard icon="⚡" title="Cair Instan" desc="Pencairan ke e-wallet cuma 1 menit, bukan 3-7 hari" />
            <FeatureCard icon="🚚" title="Jemput GRATIS" desc="Minimal 5kg langsung dijemput ke rumah tanpa biaya" />
            <FeatureCard icon="🎁" title="Bonus Rutin" desc="Challenge mingguan dengan total hadiah Rp 5 juta/bulan" />
            <FeatureCard icon="📊" title="Tracking Real-time" desc="Lihat dampak CO₂ kamu langsung di dashboard" />
            <FeatureCard icon="🏆" title="Referral Bonus" desc="Ajak teman dapat Rp 50.000 per referral yang aktif" />
          </div>
        </div>
      </section>

      {/* 6. CARA KERJA SECTION */}
      <section id="cara-kerja" className="py-24 px-6 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#2D6A4F] font-bold text-[10px] uppercase tracking-[0.2em] mb-3">CARA KERJANYA</p>
            <h2 className="text-4xl md:text-6xl font-bold text-[#1A3022] font-serif">Simpel, Cepat, Berdampak</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StepCard number="01" tag="MULAI" title="Daftar Gratis" desc="Buat akun dalam hitungan detik. Tidak ada biaya tersembunyi, selamanya gratis." />
            <StepCard number="02" tag="PILAH" title="Pilah Sampahmu" desc="Pisahkan sampah organik, plastik, kertas, dan logam di rumah. Kami kasih panduan lengkap." />
            <StepCard number="03" tag="SETOR" title="Setor ke Drop Point" desc="Bawa ke drop point terdekat atau jadwalkan penjemputan. Kamu pilih yang paling nyaman." />
            <StepCard number="04" tag="DAPAT REWARD" title="Langsung Dapat Poin" desc="Poin otomatis masuk ke akun. Tukar kapan saja ke e-wallet pilihanmu. Mudah!" />
          </div>
        </div>
      </section>

      {/* 7. REVIEW SECTION */}
      <section id="review" className="py-24 px-6 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReviewCard 
            name="Rina" location="Jakarta" amount="450.000" 
            text="Dalam 2 bulan udah dapet 450rb! Tinggal pilah sampah rumah sehari-hari, terus dijemput gratis. Uangnya langsung ke OVO." 
          />
          <ReviewCard 
            name="Budi" location="Surabaya" amount="1.2 Juta" 
            text="Gak nyangka sampah bisa jadi income sampingan! Sebulan bisa 600rb lebih. Balik modal bikin tempat sampah 3 warna dalam seminggu haha" 
          />
          <ReviewCard 
            name="Sarah" location="Bandung" amount="780.000" 
            text="Awalnya skeptis, ternyata beneran dibayar dan fast response! Sekarang tetangga pada ikutan. Bonus referral juga lumayan banget." 
          />
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="bg-[#1A3022] py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
            Mulai Aksi Iklimmu Hari Ini
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-10 max-w-xl mx-auto font-medium">
            Gratis, mudah, dan dampaknya nyata. Bergabunglah bersama ribuan warga yang sudah bergerak untuk lingkungan.
          </p>
          <button onClick={onGoToRegister} className="bg-[#EAB308] text-[#1A3022] px-10 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
            Daftar Gratis
          </button>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#0F1713] py-16 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-2">
            {/* Logo melingkar di footer */}
            <img 
              src={LogoDaurin} 
              alt="Logo" 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <div>
              <span className="text-xl font-bold text-white">
                Daurin<span className="text-orange-500">.</span>
              </span>
              <p className="text-white/30 text-xs font-medium tracking-wide">Aksi iklim untuk semua</p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-2">Brand Identity v1.0</p>
            <p className="text-white/30 text-[10px] font-medium">© 2026 Daurin. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;