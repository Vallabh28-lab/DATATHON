import React, { useState } from 'react';
import { Show, UserButton } from '@clerk/react';

export default function Navbar({ theme, setTheme, userType, setUserType, name }) {
  const [search, setSearch] = useState('');
  const dark = theme === 'dark';

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b z-30 relative backdrop-blur-sm"
      style={{ 
        backgroundColor: dark ? '#0f172a' : '#ffffff',
        borderColor: dark ? '#1e293b' : '#e5e7eb'
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F7EDA] to-[#1a5bb8] flex items-center justify-center shadow-lg">
          <span className="text-2xl">🎓</span>
        </div>
        <div className="hidden sm:block">
          <span className="font-black text-xl" style={{ color: dark ? '#fff' : '#0f172a' }}>BoundlessEd</span>
          <p className="text-xs text-gray-500">Accessible Learning</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-xl mx-8">
        <div className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl border transition-all" 
          style={{ 
            backgroundColor: dark ? '#1e293b' : '#f9fafb',
            borderColor: dark ? '#334155' : '#e5e7eb'
          }}
        >
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search courses, topics, resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: dark ? '#fff' : '#0f172a' }}
          />
          <button 
            aria-label="Voice search" 
            title="Voice search"
            className="p-1.5 rounded-lg hover:bg-gray-200/50 transition"
          >
            <span className="text-lg">🎙️</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 shrink-0">

        {/* User type selector */}
        <select
          value={userType}
          onChange={e => setUserType(e.target.value)}
          aria-label="Select accessibility mode"
          className="text-sm px-3 py-2 rounded-lg border font-medium cursor-pointer transition-all hover:border-[#2F7EDA] focus:outline-none focus:ring-2 focus:ring-[#2F7EDA]/20"
          style={{
            backgroundColor: dark ? '#1e293b' : '#f9fafb',
            borderColor: dark ? '#334155' : '#e5e7eb',
            color: dark ? '#fff' : '#0f172a'
          }}
        >
          <option value="all" className="text-black">🌍 General</option>
          <option value="blind" className="text-black">👁 Vision</option>
          <option value="deaf" className="text-black">👂 Hearing</option>
          <option value="mute" className="text-black">🗣 Speech</option>
        </select>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="p-2.5 rounded-lg border transition-all hover:border-[#2F7EDA] hover:bg-gray-50"
          style={{
            backgroundColor: dark ? '#1e293b' : '#f9fafb',
            borderColor: dark ? '#334155' : '#e5e7eb'
          }}
        >
          <span className="text-xl">{dark ? '☀️' : '🌙'}</span>
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="p-2.5 rounded-lg border transition-all hover:border-[#2F7EDA] hover:bg-gray-50 relative"
          style={{
            backgroundColor: dark ? '#1e293b' : '#f9fafb',
            borderColor: dark ? '#334155' : '#e5e7eb'
          }}
        >
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Button from Clerk */}
        <Show when="signed-in">
          <div className="flex items-center gap-3 pl-3 border-l" style={{ borderColor: dark ? '#334155' : '#e5e7eb' }}>
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold" style={{ color: dark ? '#fff' : '#0f172a' }}>{name}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10 rounded-xl',
                }
              }}
            />
          </div>
        </Show>
      </div>
    </header>
  );
}
