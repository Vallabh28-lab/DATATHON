import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles, Volume2, Image, Hand, Gamepad2, FileEdit,
  FileText, BarChart3, Settings,
  LogOut, LayoutDashboard
} from 'lucide-react';

export default function Sidebar({ userType, active, setActive, theme, collapsed }) {
  const dark = theme === 'dark';

  const menuItems = [
    { path: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
    { path: '/text-to-speech', label: 'Text to Speech', icon: Volume2 },
    { path: '/text-to-visuals', label: 'Text to Visuals', icon: Image },
    { path: '/text-to-sign-language', label: 'Text to Sign Language', icon: Hand },
    { path: '/gamified-study', label: 'Gamified Study', icon: Gamepad2 },
    { path: '/simplify-text', label: 'Simplify Text', icon: FileEdit },
    { path: '/study-notes', label: 'Study Notes', icon: FileText },
  ];

  const systemItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const NavItem = ({ item }) => {
    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => [
          'w-full flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all relative group border-r-4',
          isActive 
            ? 'bg-[#f0f7ff] border-blue-600 text-blue-600 shadow-sm'
            : (dark ? 'border-transparent text-slate-400 hover:text-blue-500 hover:bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-blue-500 hover:bg-slate-50')
        ].join(' ')}
      >
        {({ isActive }) => (
          <>
            <item.icon size={22} className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:scale-110 group-hover:text-blue-500 transition-all'} />
            {!collapsed && (
              <span className={`text-sm tracking-tight ${isActive ? 'font-black' : 'font-bold'}`}>{item.label}</span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside 
      className={[
        'flex flex-col border-r transition-all duration-500 ease-in-out z-40 relative group/sidebar',
        collapsed ? 'w-20' : 'w-72',
        dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
      ].join(' ')}
    >
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <h1 className="text-xl font-black">B</h1>
          </div>
          {!collapsed && (
            <span className={['text-lg font-black tracking-tight', dark ? 'text-white' : 'text-slate-900'].join(' ')}>
              BoundlessEd
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 space-y-8 scrollbar-hide">
        {/* Essential Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Learning Tools
            </p>
          )}
          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>

        {/* System Settings */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Preferences
            </p>
          )}
          {systemItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>
      </div>

      {/* Mini Profile / Logout Section */}
      <div className="p-6 border-t border-slate-100/50 dark:border-slate-800">
        <button 
          className="w-full flex items-center gap-4 p-2 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 text-slate-400 hover:text-red-500 transition-all group"
          onClick={() => console.log('logout')}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-red-100 dark:group-hover:bg-red-900/20 transition-colors">
            <LogOut size={18} />
          </div>
          {!collapsed && (
            <div className="text-left">
              <p className="text-xs font-black tracking-tight uppercase">Logout</p>
              <p className="text-[10px] font-bold text-slate-400">Exit Session</p>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
