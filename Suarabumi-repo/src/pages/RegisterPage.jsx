import React, { useState } from 'react';
// Pastikan path impor logo sesuai dengan struktur folder Anda
import LogoDaurin from '../assets/Logo Daurin.jpeg'; 

// TAMBAHKAN 'onContinue' di dalam props ini
const RegisterPage = ({ onBack, onGoToLogin, onContinue }) => { 
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    password: '',
    confirmPassword: '',
    alamat: '' // Tambahkan state alamat
  });
  const [errors, setErrors] = useState({});

  // --- FUNGSI NAVIGASI KE SECTION ---
  const navigateToSection = (sectionId) => {
    onBack(); 
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama wajib diisi";
    if (!formData.telepon) newErrors.telepon = "Nomor telepon wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.alamat) newErrors.alamat = "Alamat wajib diisi"; // Validasi alamat
    if (formData.password.length < 8) newErrors.password = "Minimal 8 karakter";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Password tidak cocok";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Lanjut ke verifikasi:", formData);
      if (onContinue) {
        onContinue(formData.telepon); 
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-20">
      {/* Navbar Minimalis - Tetap sesuai codingan awal */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <img 
            src={LogoDaurin} 
            alt="Logo" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <span className="text-xl font-bold text-[#1A3022]">
            Daurin<span className="text-orange-500">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span onClick={() => navigateToSection('fitur')} className="cursor-pointer hover:text-[#1A3022] transition-colors">Fitur</span>
          <span onClick={() => navigateToSection('cara-kerja')} className="cursor-pointer hover:text-[#1A3022] transition-colors">Cara Kerja</span>
          <span onClick={() => navigateToSection('review')} className="cursor-pointer hover:text-[#1A3022] transition-colors">Review</span>
        </div>

        <div className="flex gap-4">
          <button onClick={onGoToLogin} className="text-sm font-bold text-[#1A3022] px-6 py-2">Masuk</button>
          <button className="bg-[#1A3022] text-white text-sm font-bold px-8 py-2 rounded-full">Daftar</button>
        </div>
      </nav>

      {/* Header Halaman */}
      <div className="text-center mt-10 mb-8 px-6">
        <span className="bg-[#D8E6DC] text-[#2D6A4F] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          Langkah 1 dari 2
        </span>
        <h1 className="text-5xl font-bold text-[#1A3022] mt-6 mb-4 font-serif leading-tight">Buat Akun Tunas</h1>
        <p className="text-gray-500 text-sm">Bergabunglah dengan ribuan pengguna yang sudah bergerak untuk lingkungan</p>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[40px] shadow-sm p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Nama Lengkap *</label>
                <div className="flex items-center gap-3 bg-[#F5F5F0] px-4 py-4 rounded-xl border border-transparent focus-within:border-[#2D6A4F] transition-all">
                  <span className="text-gray-400">👤</span>
                  <input 
                    type="text" placeholder="Contoh: Budi Santoso" className="bg-transparent w-full outline-none text-sm"
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  />
                </div>
                {errors.nama && <p className="text-red-500 text-[10px] mt-1 text-left font-bold italic">{errors.nama}</p>}
              </div>
              <div className="text-left">
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Nomor Telepon *</label>
                <div className="flex items-center gap-3 bg-[#F5F5F0] px-4 py-4 rounded-xl border border-transparent focus-within:border-[#2D6A4F] transition-all">
                  <span className="text-gray-400">📞</span>
                  <input 
                    type="tel" placeholder="08123456789" className="bg-transparent w-full outline-none text-sm"
                    onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                  />
                </div>
                {errors.telepon && <p className="text-red-500 text-[10px] mt-1 text-left font-bold italic">{errors.telepon}</p>}
              </div>
            </div>

            <div className="text-left">
              <label className="text-xs font-bold text-[#1A3022] block mb-2">Email *</label>
              <div className="flex items-center gap-3 bg-[#F5F5F0] px-4 py-4 rounded-xl border border-transparent focus-within:border-[#2D6A4F] transition-all">
                <span className="text-gray-400">✉</span>
                <input 
                  type="email" placeholder="nama@email.com" className="bg-transparent w-full outline-none text-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 text-left font-bold italic">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Password *</label>
                <div className="flex items-center gap-3 bg-[#F5F5F0] px-4 py-4 rounded-xl border border-transparent focus-within:border-[#2D6A4F] transition-all">
                  <span className="text-gray-400">🔒</span>
                  <input 
                    type="password" placeholder="Minimal 8 karakter" className="bg-transparent w-full outline-none text-sm"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-[10px] mt-1 text-left font-bold italic">{errors.password}</p>}
              </div>
              <div className="text-left">
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Konfirmasi Password *</label>
                <div className="flex items-center gap-3 bg-[#F5F5F0] px-4 py-4 rounded-xl border border-transparent focus-within:border-[#2D6A4F] transition-all">
                  <span className="text-gray-400">🔒</span>
                  <input 
                    type="password" placeholder="Ulangi password" className="bg-transparent w-full outline-none text-sm"
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 text-left font-bold italic">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Penambahan Field Alamat sesuai image_62322e.png */}
            <div className="text-left">
              <label className="text-xs font-bold text-[#1A3022] block mb-2">Alamat Lengkap *</label>
              <div className="flex items-start gap-3 bg-[#F5F5F0] px-4 py-4 rounded-xl border border-transparent focus-within:border-[#2D6A4F] transition-all">
                <span className="text-gray-400 mt-0.5">📍</span>
                <textarea 
                  rows="2"
                  placeholder="Jl. Contoh No. 123, RT 01/RW 02, Kelurahan, Kecamatan, Kota" 
                  className="bg-transparent w-full outline-none text-sm resize-none"
                  onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                ></textarea>
              </div>
              {errors.alamat && <p className="text-red-500 text-[10px] mt-1 text-left font-bold italic">{errors.alamat}</p>}
            </div>

            <div className="bg-[#D8E6DC] p-4 rounded-xl text-center">
              <p className="text-[11px] text-[#1A3022]">
                Saya setuju dengan <span className="font-bold underline cursor-pointer">Syarat & Ketentuan</span> dan <span className="font-bold underline cursor-pointer">Kebijakan Privasi</span> Tunas
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#1A3022] text-white py-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Daftar <span>→</span>
            </button>

            {/* Penambahan Divider & Social Register sesuai desain */}
            <div className="relative my-8 text-center">
              <hr className="border-gray-100" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">Atau Daftar Dengan</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold text-gray-600">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                Daftar dengan Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3 rounded-xl hover:opacity-90 transition-all text-xs font-bold">
                <span className="bg-white text-[#1877F2] rounded-full w-4 h-4 flex items-center justify-center text-[10px]">f</span>
                Daftar dengan Facebook
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Sudah punya akun? <span onClick={onGoToLogin} className="text-[#1A3022] font-bold cursor-pointer hover:underline">Masuk di sini</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;