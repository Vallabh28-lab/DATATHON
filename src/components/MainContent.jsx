import React from 'react';

// Professional SaaS card style
const card = 'rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200';

const panels = {
  dashboard: () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Student 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Here's your learning snapshot for today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-sm text-gray-500">Active Courses</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">6</p>
          <p className="text-xs text-green-500 mt-1">+2 this month</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-sm text-gray-500">Completed Lessons</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">24</p>
          <p className="text-xs text-green-500 mt-1">+8 this week</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-sm text-gray-500">Achievements</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">5</p>
          <p className="text-xs text-yellow-500 mt-1">2 pending</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
          <p className="text-sm text-gray-500">Day Streak</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
          <p className="text-xs text-orange-500 mt-1">🔥 Keep it up!</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress - 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Learning Progress</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">View All →</button>
          </div>
          <div className="space-y-5">
            {[
              { course: 'Web Accessibility Fundamentals', lessons: '18/25 lessons', pct: 72 },
              { course: 'React Development Basics', lessons: '9/20 lessons', pct: 45 },
              { course: 'Node.js Backend Mastery', lessons: '6/20 lessons', pct: 30 },
              { course: 'UI/UX Design Principles', lessons: '3/20 lessons', pct: 15 },
            ].map(({ course, lessons, pct }) => (
              <div key={course}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{course}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lessons}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{pct}%</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity - 1 column */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { icon: '✅', title: 'Completed lesson', subtitle: 'ARIA Labels', time: '2 hours ago', color: 'bg-green-100 text-green-600' },
              { icon: '🚀', title: 'Started course', subtitle: 'React Hooks', time: '1 day ago', color: 'bg-blue-100 text-blue-600' },
              { icon: '🏆', title: 'Earned badge', subtitle: 'Quick Learner', time: '2 days ago', color: 'bg-purple-100 text-purple-600' },
              { icon: '📝', title: 'Submitted quiz', subtitle: 'CSS Flexbox', time: '3 days ago', color: 'bg-orange-100 text-orange-600' },
            ].map(({ icon, title, subtitle, time, color }, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center text-base shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="text-sm text-gray-600 truncate">{subtitle}</p>
                  <p className="text-xs text-gray-400 mt-1">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">Browse All →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {[
            { title: 'Semantic HTML', time: '12 min left', progress: 65 },
            { title: 'JavaScript ES6', time: '25 min left', progress: 40 },
            { title: 'CSS Grid Layout', time: '5 min left', progress: 80 },
            { title: 'React Components', time: '18 min left', progress: 55 },
          ].map(({ title, time, progress }) => (
            <div key={title} className="bg-gray-50 rounded-xl p-4 min-w-[240px] hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 mt-1">{time}</p>
                </div>
              </div>
              <div className="bg-gray-200 h-1.5 rounded-full mb-3">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <button className="w-full py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  courses: () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Continue your learning journey</p>
        </div>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
          Browse Courses
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Web Accessibility Fundamentals', lessons: '25 lessons', progress: 72, status: 'In Progress', icon: '🌐', color: 'bg-blue-100 text-blue-600' },
          { title: 'React Development Basics', lessons: '20 lessons', progress: 45, status: 'In Progress', icon: '⚛️', color: 'bg-cyan-100 text-cyan-600' },
          { title: 'Node.js Backend Mastery', lessons: '20 lessons', progress: 30, status: 'In Progress', icon: '🟢', color: 'bg-green-100 text-green-600' },
          { title: 'UI/UX Design Principles', lessons: '20 lessons', progress: 15, status: 'In Progress', icon: '🎨', color: 'bg-purple-100 text-purple-600' },
          { title: 'JavaScript ES6 Advanced', lessons: '18 lessons', progress: 100, status: 'Completed', icon: '🟡', color: 'bg-yellow-100 text-yellow-600' },
          { title: 'CSS Grid & Flexbox', lessons: '15 lessons', progress: 100, status: 'Completed', icon: '🎯', color: 'bg-pink-100 text-pink-600' },
        ].map(({ title, lessons, progress, status, icon, color }) => (
          <div 
            key={title} 
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            {/* Icon and Status */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-2xl`}>
                {icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                status === 'Completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {status}
              </span>
            </div>

            {/* Course Info */}
            <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{lessons}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Progress</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Continue Button */}
            <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-lg transition-colors">
              {status === 'Completed' ? 'Review' : 'Continue'}
            </button>
          </div>
        ))}
      </div>
    </div>
  ),

  ai: () => {
    const [messages, setMessages] = React.useState([
      { type: 'ai', text: 'Hi! I\'m your AI Learning Assistant. How can I help you today?' },
      { type: 'user', text: 'Can you explain React Hooks?' },
      { type: 'ai', text: 'React Hooks are functions that let you use state and other React features in functional components. The most common hooks are useState for managing state and useEffect for side effects.' },
    ]);
    const [input, setInput] = React.useState('');

    const suggestedPrompts = [
      'Explain React Hooks',
      'Summarize my notes',
      'Generate quiz questions',
      'Help with accessibility',
    ];

    const handleSend = () => {
      if (input.trim()) {
        setMessages([...messages, { type: 'user', text: input }]);
        setInput('');
        // Simulate AI response
        setTimeout(() => {
          setMessages(prev => [...prev, { type: 'ai', text: 'I\'m processing your question. This is a demo response.' }]);
        }, 1000);
      }
    };

    return (
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Learning Assistant</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Suggested prompts:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your learning..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  },

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
