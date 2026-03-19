import React from 'react';
import { Home, BookOpen, Bot, FileText, BarChart3, Settings, Mic, Search, Hand, Eye, Ear, MessageSquare, Volume2, Headphones } from 'lucide-react';

const sections = {
  search: [
    { icon: Mic, label: 'Voice Search', id: 'voicesearch' },
    { icon: Search, label: 'Text Search', id: 'textsearch' },
    { icon: Hand, label: 'Sign Language', id: 'signsearch' },
  ],
  accessibility: {
    blind: [
      { icon: Eye, label: 'Vision Support', id: 'vision' },
      { icon: Volume2, label: 'Text to Speech', id: 'tts' },
      { icon: Headphones, label: 'Audio Library', id: 'audio' },
    ],
    deaf: [
      { icon: Ear, label: 'Hearing Support', id: 'hearing' },
      { icon: FileText, label: 'Live Transcription', id: 'stt' },
      { icon: MessageSquare, label: 'Live Captions', id: 'subtitles' },
    ],
    mute: [
      { icon: MessageSquare, label: 'Speech Support', id: 'speech' },
      { icon: Volume2, label: 'Voice Generator', id: 'vocalize' },
      { icon: MessageSquare, label: 'Chat Bridge', id: 'chatbridge' },
    ],
  },
  core: [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: BookOpen, label: 'My Courses', id: 'courses' },
    { icon: Bot, label: 'AI Assistant', id: 'ai' },
  ],
  personal: [
    { icon: FileText, label: 'My Notes', id: 'notes' },
    { icon: BarChart3, label: 'Analytics', id: 'progress' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ],
};

export default function Sidebar({ userType, active, setActive, theme, collapsed }) {
  const accessibilityItems = sections.accessibility[userType] || [];

  const NavItem = ({ icon: Icon, label, id }) => {
    const isActive = active === id;
    return (
      <button
        onClick={() => setActive(id)}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={[
          'group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-blue-500/10 border-l-2 border-blue-500 text-white'
            : 'text-slate-400 hover:text-white hover:bg-slate-800 border-l-2 border-transparent',
        ].join(' ')}
      >
        <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
        {!collapsed && <span className="truncate">{label}</span>}
      </button>
    );
  };

  const SectionLabel = ({ children }) => {
    if (collapsed) return null;
    return (
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-4 mb-2 mt-6">
        {children}
      </p>
    );
  };

  return (
    <aside
      className={[
        'bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64',
      ].join(' ')}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      {!collapsed && (
        <div className="px-4 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-lg">🎓</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">BoundlessEd</p>
              <p className="text-xs text-slate-500">Learning Platform</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Smart Search */}
        <SectionLabel>Smart Search</SectionLabel>
        {sections.search.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}

        {/* Accessibility */}
        {accessibilityItems.length > 0 && (
          <>
            <SectionLabel>Accessibility</SectionLabel>
            {accessibilityItems.map((item) => (
              <NavItem key={item.id} {...item} />
            ))}
          </>
        )}

        {/* Core */}
        <SectionLabel>Core</SectionLabel>
        {sections.core.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}

        {/* Personal */}
        <SectionLabel>Personal</SectionLabel>
        {sections.personal.map((item) => (
          <NavItem key={item.id} {...item} />
        ))}
      </div>

      {/* Help Card */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800">
          <div className="bg-white/5 backdrop-blur rounded-lg p-4 space-y-2">
            <p className="text-xs font-medium text-slate-400">Need Help?</p>
            <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">
              Contact Support →
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
