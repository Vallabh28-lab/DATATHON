import React from 'react';
import { 
  Search, Bell, MessageSquare, Sun, Moon, 
  Mic, ChevronDown, Sparkles, Accessibility, Eye, Ear, Zap 
} from 'lucide-react';
import { UserButton, useUser } from "@clerk/react";

export default function Navbar({ theme, setTheme, userType, setUserType, setActive, focusMode, setFocusMode, name }) {
  const { user } = useUser();
  const [showA11y, setShowA11y] = React.useState(false);
  const dark = theme === 'dark';

  const a11yModes = [
    { id: 'general', label: 'General Mode', icon: Accessibility, color: 'text-blue-600' },
    { id: 'blind', label: 'Vision Mode', icon: Eye, color: 'text-indigo-600' },
    { id: 'deaf', label: 'Hearing Mode', icon: Ear, color: 'text-emerald-600' },
    { id: 'mute', label: 'Speech Mode', icon: MessageSquare, color: 'text-orange-600' },
  ];

  const currentMode = a11yModes.find(m => m.id === userType) || a11yModes[0];

  return (
    <nav className={['sticky top-0 z-50 w-full border-b transition-all duration-300', dark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'].join(' ')} style={{ backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Clickable Logo - Returns to Dashboard */}
        <div 
          onClick={() => setActive('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Sparkles size={20} />
          </div>
          <span className={['text-xl font-black tracking-tight', dark ? 'text-white' : 'text-slate-900'].join(' ')}>
            BoundlessEd
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Focus Mode Magic Toggle */}
          <button 
            onClick={() => setFocusMode(!focusMode)}
            className={[
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all active:scale-95 group',
              focusMode 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/40' 
                : (dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200')
            ].join(' ')}
            title={focusMode ? "Exit Focus Mode" : "Enter Focus Mode (Simplified View)"}
          >
            <Zap size={18} className={focusMode ? 'fill-white animate-pulse' : 'text-blue-500 group-hover:scale-110 transition-transform'} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">
              {focusMode ? 'Focus Active' : 'Focus Mode'}
            </span>
          </button>

          <div className={['w-px h-8 mx-1', dark ? 'bg-slate-800' : 'bg-slate-100'].join(' ')} />
          {/* A11y Mode Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowA11y(!showA11y)}
              className={['flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all active:scale-95', dark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'].join(' ')}
            >
              <currentMode.icon size={18} className={currentMode.color} />
              <span className={['text-xs font-black uppercase tracking-widest hidden sm:inline', dark ? 'text-slate-300' : 'text-slate-600'].join(' ')}>{currentMode.label}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {showA11y && (
              <div className={['absolute top-full right-0 mt-3 w-64 rounded-2xl border shadow-2xl overflow-hidden p-2', dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'].join(' ')}>
                {a11yModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => { setUserType(mode.id); setShowA11y(false); }}
                    className={['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all', userType === mode.id ? (dark ? 'bg-slate-800' : 'bg-blue-50') : (dark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50')].join(' ')}
                  >
                    <mode.icon size={18} className={mode.color} />
                    <span className={['text-xs font-bold', dark ? 'text-slate-300' : 'text-slate-700'].join(' ')}>{mode.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={['w-px h-8 mx-2', dark ? 'bg-slate-800' : 'bg-slate-100'].join(' ')} />

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            className={['p-3 rounded-xl border transition-all hover:rotate-12 active:scale-90', dark ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-50 border-slate-100 text-slate-600'].join(' ')}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className={['p-3 rounded-xl border transition-all relative group', dark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-600'].join(' ')}>
            <Bell size={20} />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
          </button>

          {/* User Profile */}
          <div className={['flex items-center gap-3 pl-3 ml-2 border-l', dark ? 'border-slate-800' : 'border-slate-100'].join(' ')}>
            <div className="hidden sm:block text-right">
              <p className={['text-xs font-black tracking-tight leading-none mb-1 uppercase', dark ? 'text-white' : 'text-slate-900'].join(' ')}>{user?.firstName || 'Student'}</p>
              <div className="flex items-center gap-1 justify-end">
                <Sparkles size={10} className="text-blue-500" />
                <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Premium Student</p>
              </div>
            </div>
            <div className="p-1 rounded-full border-2 border-blue-500/20">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
