import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { clearAuth, getStoredUser } from './services/api.js';

// Import Komponen & Pages
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Profile from './pages/Profile';
import Reward from './pages/Reward';
import Challenge from './pages/Challenge';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OTPPage from './pages/OTPPage'; 
import SuccessVerification from './pages/SuccessVerification';
import SettingsPage from './pages/SettingsPage'; 
import ForgotPassword from './pages/UbahPassword'; 
import NotificationPage from './pages/Notification';
import PreferencePage from './pages/PreferencePage'; 
import HelpPage from './pages/HelpPage'; 
import PenjemputanPage from './pages/PenjemputanPage'; 
import ImpactPage from './pages/ImpactPage'; 
import DropPointPage from './pages/DropPointPage'; 
import Leaderboard from './pages/Leaderboard'; 
// --- IMPORT PAGE BARU ---
import Badges from './pages/Badges'; 

// --- KOMPONEN PEMBANTU NAVIGASI ---
const SettingsWithNavigation = ({ handleLogout }) => {
  const navigate = useNavigate();
  return (
    <SettingsPage 
      onLogout={handleLogout}
      onChangePassword={() => navigate('/settings/password')}
      onGoToNotification={() => navigate('/settings/notifications')} 
      onGoToPreference={() => navigate('/settings/preferences')}
      onGoToHelp={() => navigate('/settings/help')}
      onBack={() => navigate('/profile')}
    />
  );
};

const NotificationWithNavigation = () => {
  const navigate = useNavigate();
  return <NotificationPage onBack={() => navigate('/settings')} />;
};

const PreferenceWithNavigation = () => {
  const navigate = useNavigate();
  return <PreferencePage onBack={() => navigate('/settings')} />;
};

const HelpWithNavigation = () => {
  const navigate = useNavigate();
  return <HelpPage onBack={() => navigate('/settings')} />;
};

// --- KOMPONEN UTAMA APP ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('suarabumi_token'));
  const [user, setUser] = useState(getStoredUser);
  const [authView, setAuthView] = useState('landing');
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    if (localStorage.getItem('suarabumi_token')) {
      setUser(getStoredUser());
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser || getStoredUser());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setIsLoggedIn(false);
    setAuthView('landing');
  };

  return (
    <Router>
      <div className="bg-[#F5F5F0] min-h-screen">
        {/* Navbar muncul hanya jika sudah login */}
        {isLoggedIn && <Navbar />}
        
        <main className={isLoggedIn ? "pt-20" : ""}>
          <Routes>
            {/* 1. ROUTE AUTHENTICATION */}
            <Route 
              path="/" 
              element={
                !isLoggedIn ? (
                  <>
                    {authView === 'landing' && (
                      <LandingPage 
                        onLogin={() => setAuthView('login')} 
                        onGoToRegister={() => setAuthView('register')} 
                      />
                    )}
                    {authView === 'login' && (
                      <LoginPage 
                        onBack={() => setAuthView('landing')} 
                        onLoginSuccess={handleLoginSuccess}
                        onGoToRegister={() => setAuthView('register')} 
                        onForgotPassword={() => setAuthView('forgot-password')}
                      />
                    )}
                    {authView === 'register' && (
                      <RegisterPage 
                        onBack={() => setAuthView('landing')} 
                        onGoToLogin={() => setAuthView('login')} 
                        onContinue={(phone) => {
                          setUserPhone(phone);
                          setAuthView('otp');
                        }}
                      />
                    )}
                    {authView === 'otp' && (
                      <OTPPage 
                        phoneNumber={userPhone || "+62 812-3456-789"}
                        onBack={() => setAuthView('register')} 
                        onVerifySuccess={() => setAuthView('success')} 
                      />
                    )}
                    {authView === 'success' && (
                      <SuccessVerification 
                        onComplete={() => setIsLoggedIn(true)} 
                      />
                    )}
                    {authView === 'forgot-password' && (
                      <ForgotPassword onBack={() => setAuthView('login')} />
                    )}
                  </>
                ) : (
                  <Navigate to="/home" replace />
                )
              } 
            />

            {/* 2. ROUTE UTAMA (PROTECTED) */}
            <Route path="/home" element={isLoggedIn ? <Home user={user} /> : <Navigate to="/" />} />
            <Route path="/reward" element={isLoggedIn ? <Reward /> : <Navigate to="/" />} />
            <Route path="/challenge" element={isLoggedIn ? <Challenge /> : <Navigate to="/" />} />
            <Route path="/impact" element={isLoggedIn ? <ImpactPage /> : <Navigate to="/" />} />
            <Route path="/drop-point" element={isLoggedIn ? <DropPointPage /> : <Navigate to="/" />} />
            <Route path="/penjemputan" element={isLoggedIn ? <PenjemputanPage /> : <Navigate to="/" />} />
            
            {/* --- ROUTE LEADERBOARD & BADGES --- */}
            <Route path="/leaderboard" element={isLoggedIn ? <Leaderboard /> : <Navigate to="/" />} />
            <Route path="/badges" element={isLoggedIn ? <Badges /> : <Navigate to="/" />} />

            <Route path="/profile" element={isLoggedIn ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />

            {/* 3. ROUTE PENGATURAN & SUB-SETTINGS */}
            <Route 
              path="/settings" 
              element={isLoggedIn ? <SettingsWithNavigation handleLogout={handleLogout} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/settings/notifications" 
              element={isLoggedIn ? <NotificationWithNavigation /> : <Navigate to="/" />} 
            />
            <Route 
              path="/settings/preferences" 
              element={isLoggedIn ? <PreferenceWithNavigation /> : <Navigate to="/" />} 
            />
            <Route 
              path="/settings/help" 
              element={isLoggedIn ? <HelpWithNavigation /> : <Navigate to="/" />} 
            />
            <Route 
              path="/settings/password" 
              element={isLoggedIn ? <ForgotPassword onBack={() => window.history.back()} /> : <Navigate to="/" />} 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;