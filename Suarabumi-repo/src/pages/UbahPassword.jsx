import React, { useState } from 'react';

const UbahPassword = ({ onBack }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }
    if (formData.newPassword.length < 8) {
      alert("Password minimal 8 karakter!");
      return;
    }
    alert("Password berhasil diperbarui!");
    onBack();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Tombol Kembali Konsisten */}
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-[#1A3022] transition-colors mb-8 group">
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-gray-100 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="font-medium">Kembali</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#1A3022] mb-3 font-serif">Ubah Password</h1>
            <p className="text-gray-500 text-sm">Pastikan password kamu kuat dan aman</p>
          </header>

          <form onSubmit={handleSubmit} className="bg-white rounded-[32px] shadow-sm p-8 md:p-10 border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Password Lama</label>
                <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} placeholder="Masukkan password lama" className="w-full bg-[#F5F5F0] px-5 py-4 rounded-2xl text-sm outline-none border border-transparent focus:border-green-600 transition-all" required />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Password Baru</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Minimal 8 karakter" className="w-full bg-[#F5F5F0] px-5 py-4 rounded-2xl text-sm outline-none border border-transparent focus:border-green-600 transition-all" required />
                <p className="text-[10px] text-gray-400 mt-2">Gunakan kombinasi huruf, angka, dan simbol</p>
              </div>
              <div>
                <label className="text-xs font-bold text-[#1A3022] block mb-2">Konfirmasi Password Baru</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Ulangi password baru" className="w-full bg-[#F5F5F0] px-5 py-4 rounded-2xl text-sm outline-none border border-transparent focus:border-green-600 transition-all" required />
              </div>
              <button type="submit" className="w-full bg-[#1A3022] text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:opacity-90 transition-all mt-4 active:scale-95">Simpan Password Baru</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UbahPassword;