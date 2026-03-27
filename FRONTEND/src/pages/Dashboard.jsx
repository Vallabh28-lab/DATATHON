import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import Navbar      from '../components/Navbar';
import Sidebar     from '../components/Sidebar';
import MainContent from '../components/MainContent';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [theme, setTheme] = useState('light');
  const [userType, setUserType] = useState(localStorage.getItem('userType') || 'all');
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !user) {
      navigate('/');
    }
  }, [isLoaded, user, navigate]);

  const handleUserType = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  if (!isLoaded || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const hc = theme === 'dark';

  const visualsTheme = active === 'texttovisuals' ? 'texttovisuals-theme' : '';

  return (
    <div className={[
      'flex flex-col h-screen w-full overflow-hidden', 
      hc ? 'bg-gray-950' : 'bg-[#f5f7fb]',
      visualsTheme
    ].join(' ')}>


      {/* Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        userType={userType}
        setUserType={handleUserType}
        setActive={setActive}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        name={user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'User'}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar - Hide in Focus Mode */}
        {!focusMode && (
          <Sidebar
            userType={userType}
            active={active}
            setActive={setActive}
            theme={theme}
            collapsed={collapsed}
          />
        )}

        {/* Collapse toggle - Hide in Focus Mode */}
        {!focusMode && (
          <button
            onClick={() => setCollapsed(p => !p)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={['fixed left-6 bottom-8 z-50 p-4 rounded-2xl shadow-xl transition-all active:scale-90 flex items-center justify-center border', hc ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-600'].join(' ')}
          >
            {collapsed ? '→' : '←'}
          </button>
        )}

        {/* Main */}
        <MainContent 
          active={active} 
          setActive={setActive} 
          theme={theme} 
          focusMode={focusMode}
        />
      </div>
    </div>
  );
}
