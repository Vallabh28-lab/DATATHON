import React from 'react';
import { 
  Sparkles, Volume2, Image, Hand, Gamepad2, FileEdit,
  FileText, BarChart3, Settings,
  LogOut, LayoutDashboard
} from 'lucide-react';

export default function Sidebar({ userType, active, setActive, theme, collapsed }) {
  const dark = theme === 'dark';

  const menuItems = [
    { id: 'ai', label: 'AI Assistant', icon: Sparkles, color: 'text-purple-500' },
    { id: 'texttospeech', label: 'Text to Speech', icon: Volume2, color: 'text-blue-500' },
    { id: 'texttovisuals', label: 'Text to Visuals', icon: Image, color: 'text-indigo-500' },
{ id: 'signlang', label: 'Sign Language to Text', icon: Hand, color: 'text-cyan-500' },
    { id: 'gamified', label: 'Gamified Study', icon: Gamepad2, color: 'text-orange-500' },
    { id: 'simplify', label: 'Simplify Text', icon: FileEdit, color: 'text-cyan-500' },
    { id: 'notes', label: 'Study Notes', icon: FileText, color: 'text-slate-500' },
    { id: 'progress', label: 'Analytics', icon: BarChart3, color: 'text-pink-500' },
  ];

  const systemItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const NavItem = ({ item }) => {
    const isActive = active === item.id;
    return (
      <button
        key={item.id}
        onClick={() => setActive(item.id)}
        className={[
          'w-full flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all relative group',
          isActive 
            ? (dark ? 'bg-slate-800 text-white shadow-lg shadow-black/20' : 'bg-blue-50 text-blue-600 shadow-sm')
            : (dark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')
        ].join(' ')}
      >
        <item.icon size={22} className={isActive ? item.color : 'text-slate-400 group-hover:scale-110 transition-transform'} />
        {!collapsed && (
          <span className="text-sm font-bold tracking-tight">{item.label}</span>
        )}
        {isActive && (
          <div className="absolute right-2 w-1.5 h-6 rounded-full bg-blue-600 animate-in fade-in zoom-in" />
        )}
      </button>
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
            <NavItem key={item.id} item={item} />
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
            <NavItem key={item.id} item={item} />
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
