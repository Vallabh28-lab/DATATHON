import React from 'react';

const commonItems = [
  { icon: '🏠', label: 'Dashboard',    id: 'dashboard' },
  { icon: '📚', label: 'My Courses',      id: 'courses'   },
  { icon: '🤖', label: 'AI Assistant', id: 'ai'        },
  { icon: '📝', label: 'My Notes',        id: 'notes'     },
  { icon: '📊', label: 'Analytics',     id: 'progress'  },
  { icon: '⚙️', label: 'Settings',    id: 'settings'  },
];

const adaptiveItems = {
  blind: [
    { icon: '👁️', label: 'Vision Support', id: 'vision' },
    { icon: '🔊', label: 'Text to Speech', id: 'tts'   },
    { icon: '🎧', label: 'Audio Library',  id: 'audio' },
  ],
  deaf: [
    { icon: '👂', label: 'Hearing Support', id: 'hearing' },
    { icon: '📝', label: 'Live Transcription', id: 'stt'       },
    { icon: '💬', label: 'Live Captions',      id: 'subtitles' },
  ],
  mute: [
    { icon: '🗣️', label: 'Speech Support', id: 'speech' },
    { icon: '🔊', label: 'Voice Generator', id: 'vocalize'      },
    { icon: '💬', label: 'Chat Bridge',   id: 'chatbridge'     },
  ],
  all: [],
};

export default function Sidebar({ userType, active, setActive, theme, collapsed }) {
  const dark  = theme === 'dark';
  const extra = adaptiveItems[userType] || [];

  const Item = ({ icon, label, id }) => {
    const isActive = active === id;
    return (
      <button
        onClick={() => setActive(id)}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={[
          'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-[#2F7EDA] text-white shadow-lg shadow-[#2F7EDA]/30 font-semibold'
            : 'text-gray-400 hover:text-white hover:bg-[#1e293b]',
        ].join(' ')}
      >
        <span className="text-xl shrink-0">{icon}</span>
        {!collapsed && <span className="truncate">{label}</span>}
      </button>
    );
  };

  const SectionTitle = ({ children }) => {
    if (collapsed) return null;
    return (
      <p className="text-xs font-bold uppercase px-4 mb-2 mt-4 text-gray-500 tracking-wider">
        {children}
      </p>
    );
  };

  return (
    <aside
      className={[
        'flex flex-col py-6 h-full transition-all duration-300 border-r',
        collapsed ? 'w-20 px-2' : 'w-64 px-3'
      ].join(' ')}
      style={{ 
        backgroundColor: dark ? '#0f172a' : '#0f172a',
        borderColor: '#1e293b'
      }}
      aria-label="Sidebar navigation"
    >
      {/* Logo Section */}
      {!collapsed && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2F7EDA] to-[#1a5bb8] flex items-center justify-center">
              <span className="text-lg">🎓</span>
            </div>
            <div>
              <p className="font-bold text-white text-sm">BoundlessEd</p>
              <p className="text-xs text-gray-500">Learning Platform</p>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {/* Multimodal Search Hub */}
        <SectionTitle>🔍 Smart Search</SectionTitle>
        <Item icon="🎙️" label="Voice Search" id="voicesearch" />
        <Item icon="⌨️" label="Text Search" id="textsearch" />
        <Item icon="🤟" label="Sign Language" id="signsearch" />

        {/* Adaptive section */}
        {extra.length > 0 && (
          <>
            <SectionTitle>♿ Accessibility</SectionTitle>
            {extra.map(i => <Item key={i.id} {...i} />)}
          </>
        )}

        {/* Common items */}
        <SectionTitle>📋 Navigation</SectionTitle>
        {commonItems.map(i => <Item key={i.id} {...i} />)}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-[#1e293b] border border-[#334155]">
          <p className="text-xs text-gray-400 mb-1">Need Help?</p>
          <button className="text-sm font-semibold text-[#2F7EDA] hover:text-[#1a5bb8] transition">
            💬 Contact Support
          </button>
        </div>
      )}
    </aside>
  );
}
