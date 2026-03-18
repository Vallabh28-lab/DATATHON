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

  return (
    <div className={['flex flex-col h-screen w-full overflow-hidden', hc ? 'bg-gray-950' : 'bg-[#f5f7fb]'].join(' ')}>

      {/* Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        userType={userType}
        setUserType={handleUserType}
        name={user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'User'}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          userType={userType}
          active={active}
          setActive={setActive}
          theme={theme}
          collapsed={collapsed}
        />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(p => !p)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="fixed left-2 bottom-4 z-50 p-3 rounded-xl bg-[#0f172a] border border-white/20 text-white text-sm font-bold hover:bg-[#1e293b] shadow-lg transition"
        >
          {collapsed ? '→' : '←'}
        </button>

        {/* Main */}
        <MainContent active={active} theme={theme} />
      </div>
    </div>
  );
}
