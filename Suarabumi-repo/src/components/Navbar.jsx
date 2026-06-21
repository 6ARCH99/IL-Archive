import { Link, useLocation } from 'react-router-dom';
import LogoDaurin from '../assets/Logo Daurin.jpeg'; 

const Navbar = () => {
  const location = useLocation();

  // Daftar menu navigasi utama
  const menuItems = [
    { name: 'HOME', path: '/home' }, 
    { name: 'REWARD', path: '/reward' },
    { name: 'CHALLENGE', path: '/challenge' },
    { name: 'IMPACT', path: '/impact' },
    { name: 'DROP POINT', path: '/drop-point' },
    { name: 'PENJEMPUTAN', path: '/penjemputan' },
  ];

  // Helper untuk menentukan apakah rute aktif
  const isPathActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-10 border-b border-gray-200/50 bg-[#F5F5F0]/95 backdrop-blur-md z-[100] transition-all duration-300">
      
      {/* KIRI: Logo & Brand */}
      <Link to="/home" className="flex items-center gap-3 group">
        <div className="h-10 w-10 rounded-full bg-[#1A3022] flex items-center justify-center overflow-hidden border-2 border-[#1A3022] group-hover:scale-105 transition-transform shadow-sm">
          <img 
            src={LogoDaurin} 
            alt="Tunas Logo" 
            className="h-full w-full object-cover" 
          />
        </div>
        <h1 className="text-2xl font-bold text-[#1A3022] flex items-center font-serif tracking-tight">
          Daurin
          <span className="text-orange-500">.</span>
        </h1>
      </Link>
      
      {/* TENGAH: Menu Navigasi (Desktop) */}
      <div className="hidden lg:flex gap-8 text-[11px] font-bold tracking-[0.15em]">
        {menuItems.map((item) => {
          const isActive = isPathActive(item.path);
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`relative transition-all duration-300 py-1 ${
                isActive 
                ? 'text-[#1A3022]' 
                : 'text-gray-400 hover:text-[#1A3022]'
              }`}
            >
              {item.name}
              {/* Garis bawah untuk menu aktif */}
              <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[#1A3022] transition-all duration-300 transform origin-left ${
                isActive ? 'scale-x-100' : 'scale-x-0'
              }`}></span>
            </Link>
          );
        })}
      </div>
      
      {/* KANAN: Grup Ikon Navigasi */}
      <div className="flex items-center gap-3">
        {/* Ikon Trophy (Leaderboard) */}
        <Link 
          to="/leaderboard"
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-sm active:scale-90 ${
            isPathActive('/leaderboard') ? 'bg-[#2D6A4F]' : 'bg-[#1A3022] hover:bg-[#2D4A37]'
          }`}
        >
          <span className="text-base">🏆</span>
        </Link>
        
        {/* Ikon Medal (Badges) - SEKARANG MENGARAH KE /badges */}
        <Link 
          to="/badges"
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-sm active:scale-90 ${
            isPathActive('/badges') ? 'bg-[#2D6A4F]' : 'bg-[#1A3022] hover:bg-[#2D4A37]'
          }`}
        >
          <span className="text-base">🏅</span>
        </Link>

        {/* Ikon Settings */}
        <Link 
          to="/settings"
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-sm active:scale-90 ${
            location.pathname.startsWith('/settings') ? 'bg-[#2D6A4F]' : 'bg-[#1A3022] hover:bg-[#2D4A37]'
          }`}
        >
          <span className="text-base">⚙️</span>
        </Link>

        {/* Ikon User/Profile */}
        <Link 
          to="/profile" 
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-sm active:scale-90 ${
            isPathActive('/profile')
            ? 'bg-[#2D6A4F] ring-2 ring-offset-2 ring-[#2D6A4F]' 
            : 'bg-[#1A3022] hover:bg-[#2D4A37]'
          }`}
        >
          <span className="text-base">👤</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;