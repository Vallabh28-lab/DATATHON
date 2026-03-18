import React from 'react';

// Professional SaaS card style
const card = 'rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200';

const panels = {
  dashboard: () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Welcome back! 👋</h2>
          <p className="text-gray-600 mt-1">Here's what's happening with your learning today</p>
        </div>
        <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition shadow-lg hover:shadow-xl">
          + New Course
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: '📚', label: 'Active Courses', value: '6', change: '+2 this month', color: 'from-blue-500 to-blue-600' },
          { icon: '✅', label: 'Completed Lessons', value: '24', change: '+8 this week', color: 'from-green-500 to-green-600' },
          { icon: '🏆', label: 'Achievements', value: '5', change: '2 pending', color: 'from-purple-500 to-purple-600' },
          { icon: '🔥', label: 'Day Streak', value: '12', change: 'Keep it up!', color: 'from-orange-500 to-orange-600' },
        ].map(({ icon, label, value, change, color }) => (
          <div key={label} className={`${card} relative overflow-hidden group cursor-pointer`}>
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color} opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300`}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{icon}</span>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{change}</span>
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{value}</p>
              <p className="text-sm text-gray-600 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className={card}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-gray-900">📊 Learning Progress</h3>
                <p className="text-sm text-gray-600 mt-1">Track your course completion</p>
              </div>
              <button className="text-sm font-semibold text-[#2F7EDA] hover:text-[#1a5bb8] transition">View All →</button>
            </div>
            <div className="space-y-5">
              {[
                { course: 'Web Accessibility Fundamentals', pct: 72, lessons: '18/25 lessons', color: '#2F7EDA' },
                { course: 'React Development Basics', pct: 45, lessons: '9/20 lessons', color: '#10b981' },
                { course: 'Node.js Backend Mastery', pct: 30, lessons: '6/20 lessons', color: '#f59e0b' },
                { course: 'UI/UX Design Principles', pct: 15, lessons: '3/20 lessons', color: '#8b5cf6' },
              ].map(({ course, pct, lessons, color }) => (
                <div key={course} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-[#2F7EDA] transition">{course}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{lessons}</p>
                    </div>
                    <span className="text-lg font-bold ml-4" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed - Takes 1 column */}
        <div className={card}>
          <h3 className="font-bold text-xl text-gray-900 mb-6">🔔 Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Completed lesson', title: 'ARIA Labels', time: '2 hours ago', icon: '✅', color: 'bg-green-100 text-green-600' },
              { action: 'Started course', title: 'React Hooks', time: '1 day ago', icon: '🚀', color: 'bg-blue-100 text-blue-600' },
              { action: 'Earned badge', title: 'Quick Learner', time: '2 days ago', icon: '🏆', color: 'bg-purple-100 text-purple-600' },
              { action: 'Submitted quiz', title: 'CSS Flexbox', time: '3 days ago', icon: '📝', color: 'bg-orange-100 text-orange-600' },
            ].map(({ action, title, time, icon, color }, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-lg shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{action}</p>
                  <p className="text-sm text-gray-600 truncate">{title}</p>
                  <p className="text-xs text-gray-500 mt-1">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className={card}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-gray-900">▶️ Continue Learning</h3>
          <button className="text-sm font-semibold text-[#2F7EDA] hover:text-[#1a5bb8] transition">Browse All →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Semantic HTML', progress: 65, time: '12 min left', thumb: '🌐' },
            { title: 'JavaScript ES6', progress: 40, time: '25 min left', thumb: '🟡' },
            { title: 'CSS Grid Layout', progress: 80, time: '5 min left', thumb: '🎨' },
          ].map(({ title, progress, time, thumb }) => (
            <div key={title} className="p-4 rounded-xl border border-gray-200 hover:border-[#2F7EDA] hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2F7EDA] to-[#1a5bb8] flex items-center justify-center text-2xl">
                  {thumb}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-[#2F7EDA] transition">{title}</p>
                  <p className="text-xs text-gray-500">{time}</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className="h-1.5 rounded-full bg-[#2F7EDA]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  courses: () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">📚 My Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[['Web Accessibility', '12 lessons', '🌐'], ['React for All', '8 lessons', '⚛️'], ['Node.js Basics', '10 lessons', '🟢'], ['AI & Learning', '6 lessons', '🤖']].map(([title, lessons, icon]) => (
          <div key={title} className={`${card} flex gap-4 items-center cursor-pointer hover:-translate-y-1`}>
            <span className="text-5xl">{icon}</span>
            <div>
              <p className="font-bold text-lg text-gray-900">{title}</p>
              <p className="text-sm text-gray-600">{lessons}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  ai: () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">🤖 AI Assistant</h2>
      <div className={`${card} h-96 flex items-center justify-center text-gray-500`}>
        Chat interface coming soon...
      </div>
      <input placeholder="Ask me anything..." className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#2F7EDA] focus:ring-2 focus:ring-[#2F7EDA]/20 transition" />
    </div>
  ),

  notes: () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">📝 Notes & Transcripts</h2>
      <textarea placeholder="Write your notes here..." rows={12} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-[#2F7EDA] focus:ring-2 focus:ring-[#2F7EDA]/20 transition" />
    </div>
  ),

  progress: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">📊 Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Detailed insights into your learning journey</p>
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2F7EDA]/20">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>All time</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Study Time', value: '24.5 hrs', change: '+12%', icon: '⏱️' },
          { label: 'Completion Rate', value: '68%', change: '+5%', icon: '🎯' },
          { label: 'Average Score', value: '87%', change: '+3%', icon: '⭐' },
        ].map(({ label, value, change, icon }) => (
          <div key={label} className={card}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{icon}</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{change}</span>
            </div>
            <p className="text-2xl font-black text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Course Progress */}
      <div className={card}>
        <h3 className="font-bold text-xl text-gray-900 mb-6">Course Progress Breakdown</h3>
        <div className="space-y-5">
          {[
            { course: 'Web Accessibility Fundamentals', pct: 72, status: 'On Track', color: '#2F7EDA' },
            { course: 'React Development Basics', pct: 45, status: 'In Progress', color: '#10b981' },
            { course: 'Node.js Backend Mastery', pct: 30, status: 'Started', color: '#f59e0b' },
            { course: 'AI & Machine Learning', pct: 10, status: 'Just Started', color: '#8b5cf6' },
          ].map(({ course, pct, status, color }) => (
            <div key={course} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{course}</p>
                  <p className="text-xs text-gray-500 mt-1">{status}</p>
                </div>
                <span className="text-xl font-bold" style={{ color }}>{pct}%</span>
              </div>
              <div className="h-3 rounded-full bg-white">
                <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  // Multimodal Search Hub
  voicesearch: () => (
    <div className={`${card} text-center space-y-6`}>
      <p className="text-6xl">🎙️</p>
      <h2 className="text-3xl font-black text-gray-900">Voice Search</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">Use natural language processing to ask questions and retrieve academic resources. Perfect for hands-free interaction.</p>
      <button className="px-8 py-4 rounded-xl font-bold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition shadow-lg hover:shadow-xl">🎙️ Start Voice Search</button>
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">Try saying: "Explain binary search trees" or "Find resources on React hooks"</p>
      </div>
    </div>
  ),

  textsearch: () => (
    <div className={`${card} space-y-6`}>
      <div className="text-center">
        <p className="text-6xl mb-4">⌨️</p>
        <h2 className="text-3xl font-black text-gray-900">Text Search</h2>
        <p className="text-gray-600 mt-2">High-speed AI-optimized search with smart suggestions for technical terms.</p>
      </div>
      <input 
        placeholder="Search for courses, topics, or concepts..." 
        className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 outline-none focus:border-[#2F7EDA] focus:ring-4 focus:ring-[#2F7EDA]/20 transition text-lg" 
      />
      <div className="grid grid-cols-2 gap-3">
        {['Data Structures', 'Algorithms', 'Web Development', 'Machine Learning'].map(term => (
          <button key={term} className="px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition">{term}</button>
        ))}
      </div>
    </div>
  ),

  signsearch: () => (
    <div className={`${card} text-center space-y-6`}>
      <p className="text-6xl">🤟</p>
      <h2 className="text-3xl font-black text-gray-900">Sign Recognition Search</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">Use your webcam to detect ISL (Indian Sign Language) signs and trigger search queries. Navigate using your native language.</p>
      <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">📹 Camera feed will appear here</p>
      </div>
      <button className="px-8 py-4 rounded-xl font-bold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition shadow-lg hover:shadow-xl">📹 Enable Camera</button>
    </div>
  ),

  // Vision Support (For Blind Users)
  vision: () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">👁️ Vision Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={card}>
          <p className="text-5xl mb-4">📷</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Scene Narrator</h3>
          <p className="text-gray-600 mb-4">Real-time audio descriptions of classroom, teacher movements, and physical objects using your camera.</p>
          <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition w-full">Start Narrator</button>
        </div>
        <div className={card}>
          <p className="text-5xl mb-4">📊</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">STEM Explainer</h3>
          <p className="text-gray-600 mb-4">Converts complex visual diagrams (circuits, graphs) into structured high-detail audio summaries.</p>
          <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition w-full">Upload Diagram</button>
        </div>
      </div>
    </div>
  ),

  // Hearing Support (For Deaf Users)
  hearing: () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">👂 Hearing Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={card}>
          <p className="text-5xl mb-4">📝</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Live Lecture Subtitles</h3>
          <p className="text-gray-600 mb-4">Real-time speech-to-text engine displaying captions for everything the teacher says.</p>
          <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition w-full">Enable Subtitles</button>
        </div>
        <div className={card}>
          <p className="text-5xl mb-4">🚨</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Alert System</h3>
          <p className="text-gray-600 mb-4">Converts auditory cues (bells, name calls) into high-contrast visual pulses and flash notifications.</p>
          <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition w-full">Activate Alerts</button>
        </div>
      </div>
    </div>
  ),

  // Speech Support (For Mute Users)
  speech: () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-900">🗣️ Speech Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={card}>
          <p className="text-5xl mb-4">🔊</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Vocalize Dashboard</h3>
          <p className="text-gray-600 mb-4">Grid of common academic phrases and icons that are spoken aloud by high-quality AI voice when clicked.</p>
          <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition w-full">Open Dashboard</button>
        </div>
        <div className={card}>
          <p className="text-5xl mb-4">💬</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Chat-Bridge</h3>
          <p className="text-gray-600 mb-4">Low-latency text-to-speech window for instant participation in live classroom discussions.</p>
          <button className="px-6 py-3 rounded-xl font-semibold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition w-full">Launch Chat-Bridge</button>
        </div>
      </div>
    </div>
  ),

  // Legacy accessibility tools
  tts: () => (
    <div className={`${card} text-center space-y-6`}>
      <p className="text-6xl">🔊</p>
      <h2 className="text-3xl font-black text-gray-900">Text-to-Speech</h2>
      <p className="text-gray-600">Paste any text and have it read aloud.</p>
      <textarea rows={6} placeholder="Enter text to speak..." className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-[#2F7EDA] focus:ring-2 focus:ring-[#2F7EDA]/20 transition" />
      <button className="px-8 py-4 rounded-xl font-bold text-white bg-[#2F7EDA] hover:bg-[#1a5bb8] transition shadow-lg hover:shadow-xl">▶ Speak</button>
    </div>
  ),

  audio:     () => <div className={`${card} text-center space-y-6`}><p className="text-6xl">🎧</p><h2 className="text-3xl font-black text-gray-900">Audio Lessons</h2><p className="text-gray-600">All lessons available in audio format.</p></div>,
  stt:       () => <div className={`${card} text-center space-y-6`}><p className="text-6xl">📝</p><h2 className="text-3xl font-black text-gray-900">Speech-to-Text</h2><p className="text-gray-600">Speak and see your words transcribed live.</p></div>,
  subtitles: () => <div className={`${card} text-center space-y-6`}><p className="text-6xl">💬</p><h2 className="text-3xl font-black text-gray-900">Subtitles & Captions</h2><p className="text-gray-600">All videos include accurate subtitles.</p></div>,
  vocalize:      () => <div className={`${card} text-center space-y-6`}><p className="text-6xl">💬</p><h2 className="text-3xl font-black text-gray-900">Vocalize Dashboard</h2><p className="text-gray-600">Click phrases to have them spoken aloud.</p></div>,
  chatbridge:  () => <div className={`${card} text-center space-y-6`}><p className="text-6xl">🎵</p><h2 className="text-3xl font-black text-gray-900">Chat-Bridge</h2><p className="text-gray-600">Real-time text-to-speech for classroom participation.</p></div>,
  settings:  () => <div className={`${card} space-y-6`}><h2 className="text-3xl font-black text-gray-900">⚙️ Settings</h2><p className="text-gray-600">Preferences, accessibility options, and account settings.</p></div>,
};

export default function MainContent({ active, theme }) {
  const dark  = theme === 'dark';
  const Panel = panels[active] || panels.dashboard;

  return (
    <main
      className="flex-1 overflow-y-auto p-8"
      style={{ backgroundColor: dark ? '#0f172a' : '#f5f7fb' }}
      aria-label="Main content"
    >
      <Panel />
    </main>
  );
}
