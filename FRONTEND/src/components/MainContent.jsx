import React from 'react';
import { ChevronRight, Search, Mic, Sparkles, Eye, Ear, MessageSquare } from 'lucide-react';
import { askAI } from '../services/api';
import TextToSpeechReader from './TextToSpeechReader';
import TextToVisualsDashboard from './TextToVisualsDashboard';
import SignLangTranslator from './SignLangTranslator.tsx';


// Professional SaaS card style
const card = 'rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200';

const panels = {
  dashboard: ({ onNavigate }) => (
    <div className="space-y-12">
      {/* Bold Hero Section */}
      <div className="pt-12 pb-8">
        <h1 className="font-hero text-clamp-hero font-black text-blue-600 leading-[0.9] tracking-tight-extreme">
          Learn Without <br />
          <span className="text-blue-500">Limits</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          Your path to mastery, simplified. Every tool you need to succeed is right here at your fingertips.
        </p>
      </div>

      {/* Primary Gateway: My Learning */}
      <div
        onClick={() => onNavigate('courses')}
        className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-12 text-white cursor-pointer hover:scale-[1.01] transition-all duration-500 shadow-2xl shadow-slate-200 dark:shadow-none"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">My Learning</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Resume your journey. You were last studying <span className="text-white font-bold">Web Accessibility Mastery</span>.
            </p>
          </div>
          <button className="px-8 py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-3 w-fit">
            Continue Learning <ChevronRight size={20} />
          </button>
        </div>

        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px]" />
      </div>

      {/* SaaS Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Active Paths', value: '04', trend: '+1 new', color: 'from-blue-500 to-blue-600' },
          { label: 'Lessons Done', value: '28', trend: 'Top 2%', color: 'from-emerald-500 to-emerald-600' },
          { label: 'Study Hours', value: '42.5', trend: '3h today', color: 'from-orange-500 to-orange-600' },
          { label: 'Achievements', value: '12', trend: 'Mastery', color: 'from-purple-500 to-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 group-hover:text-blue-600 transition-colors">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{stat.trend}</span>
            </div>
            <div className="mt-6 h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-2/3 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Subject Mastery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Accessibility Mastery', pct: 92, color: 'bg-blue-600' },
              { name: 'React Development', pct: 45, color: 'bg-indigo-600' },
              { name: 'Neural Networks', pct: 18, color: 'bg-emerald-600' },
              { name: 'UI Systems', pct: 65, color: 'bg-orange-600' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{item.pct}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Live Activity</h2>
          <div className="space-y-6">
            {[
              { action: 'Quiz Passed', desc: 'WCAG 2.2 Standard', time: '12m ago' },
              { action: 'AI Generated', desc: 'Summary: Lecture 4', time: '1h ago' },
              { action: 'Streak Hit', desc: '7 Days Learning', time: '4h ago' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="w-1 bg-slate-100 dark:bg-slate-800 h-16 rounded-full relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 shadow-sm" />
                </div>
                <div className="pt-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{activity.time}</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{activity.action}</p>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),


  courses: () => (
    <div className="space-y-12">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Learning</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">All your courses in one place</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search your library..."
              className="pl-12 pr-6 py-4 bg-white dark:bg-slate-900 border-2 border-transparent focus:border-blue-100 rounded-2xl text-sm font-bold outline-none transition-all w-80 shadow-sm focus:bg-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Mic className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer" />
          </div>
          <button className="p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:bg-slate-50 transition-all">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: 'Web Accessibility Mastery', lessons: '25 Lessons', progress: 75, status: 'Advanced', icon: '🌐', color: 'bg-blue-600' },
          { title: 'React Performance 2024', lessons: '18 Lessons', progress: 42, status: 'Intermediate', icon: '⚛️', color: 'bg-indigo-600' },
          { title: 'Neural Networks Basics', lessons: '12 Lessons', progress: 18, status: 'Beginner', icon: '🧠', color: 'bg-emerald-600' },
          { title: 'UI Design Systems', lessons: '20 Lessons', progress: 65, status: 'Intermediate', icon: '🎨', color: 'bg-purple-600' },
        ].map((course, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100/50 dark:border-slate-800/50 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="flex justify-between items-start mb-10">
              <div className={`w-16 h-16 rounded-2xl ${course.color} flex items-center justify-center text-4xl shadow-xl shadow-slate-100 dark:shadow-none group-hover:scale-110 transition-transform duration-500`}>
                {course.icon}
              </div>
              <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase text-slate-500 rounded-full tracking-widest">{course.status}</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">{course.title}</h3>
            <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">{course.lessons}</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Completion</span>
                <span className="text-slate-900 dark:text-white">{course.progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div className={`h-full ${course.color} rounded-full transition-all duration-1000 shadow-lg shadow-blue-500/10`} style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            <button className="w-full py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
              Continue <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  ),


  ai: () => {
    const [isListening, setIsListening] = React.useState(false);
    const [status, setStatus] = React.useState('Idle');
    const [message, setMessage] = React.useState('');
    const [chat, setChat] = React.useState([
      { role: 'ai', text: "Hello! I'm your BoundlessEd Learning Assistant. I can help you summarize chapters, generate flashcards, or explain complex concepts with voice and sign support. How can I assist you today?" }
    ]);
    
    // Auto-scroll logic
    const chatEndRef = React.useRef(null);
    React.useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat, status]);

    // Use Ref to capture latest message for the speech callback
    const messageRef = React.useRef('');
    React.useEffect(() => {
      messageRef.current = message;
    }, [message]);

    // Speech Recognition Setup
    const startSpeech = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Voice recognition is not supported in this browser. Please use Chrome.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('Listening...');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setMessage(transcript);
        
        if (event.results[0].isFinal) {
          setStatus('Thinking...');
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech error:', event.error);
        setIsListening(false);
        setStatus('Voice Error');
        setTimeout(() => setStatus('Idle'), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        const finalText = messageRef.current;
        if (finalText.trim()) {
          setStatus('Thinking...');
          handleSend(finalText);
        } else {
          setStatus('Idle');
        }
      };

      recognition.start();
    };

    const handleSend = async (text) => {
      const msgText = typeof text === 'string' ? text : message;
      if (!msgText || !msgText.trim()) return;
      
      const newChat = [...chat, { role: 'user', text: msgText }];
      setChat(newChat);
      setMessage('');
      setStatus('Thinking...');

      try {
        const response = await askAI(msgText);
        const aiAnswer = response.data.answer;
        setChat(prev => [...prev, { role: 'ai', text: aiAnswer }]);
        setStatus('Idle');
        
        // USP: Automatic Vocalization
        const speak = (content) => {
          const utterance = new SpeechSynthesisUtterance(content);
          utterance.lang = 'en-IN';
          window.speechSynthesis.speak(utterance);
        };
        speak(aiAnswer);

      } catch (err) {
        console.error('AI Error:', err);
        setChat(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
        setStatus('Idle');
      }
    };

    return (
      <div className="h-full flex flex-col max-w-5xl mx-auto">
        {/* Chat Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Academic Assistant</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Your personal growth companion</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={[`flex h-3 w-3 rounded-full transition-colors`, status === 'Listening...' ? 'bg-blue-500 animate-ping' : 'bg-green-500'].join(' ')}></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {status === 'Idle' ? 'System Online' : status}
            </span>
          </div>
        </div>

        {/* Unified Chat Interface */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {chat.map((m, i) => (
              <div key={i} className={[`flex animate-in fade-in slide-in-from-bottom-4 duration-500`, m.role === 'user' ? 'justify-end' : 'justify-start'].join(' ')}>
                <div className={[
                  'p-6 rounded-3xl max-w-[80%] shadow-sm border transition-all duration-300',
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white border-transparent rounded-tr-none' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-100 dark:border-slate-700 rounded-tl-none italic font-bold'
                ].join(' ')}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            
            {/* Thinking Animation Bubble */}
            {status === 'Thinking...' && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest italic">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="px-8 py-4 flex flex-wrap gap-2 border-t border-slate-50 dark:border-slate-800">
            {["Quantum Computing", "React Notes", "Accessibility Quiz"].map((prompt, i) => (
              <button 
                key={i}
                aria-label={`Ask AI: ${prompt}`}
                onClick={() => handleSend(prompt)}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-blue-100 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Unified Input Zone */}
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800">
            <div className="relative flex items-center gap-4 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              
              {/* Recording Animation for Deaf Students */}
              {isListening && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 animate-in fade-in slide-in-from-bottom-2 z-10">
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="text-[10px] font-black text-blue-600 uppercase ml-2 tracking-widest">Listening</span>
                </div>
              )}

              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask or speak..."
                aria-label="Chat Message Input"
                onKeyDown={(e) => e.key === 'Enter' && handleSend(message)}
                className="flex-1 bg-transparent px-4 py-3 text-sm font-bold outline-none placeholder:text-slate-400 dark:text-white"
              />

              <div className="flex items-center gap-2">
                {/* Accessible Microphone Button */}
                <button 
                  onClick={startSpeech}
                  aria-label={isListening ? "Listening Active" : "Activate Voice Input"}
                  className={[
                    "p-3 rounded-xl transition-all relative group shadow-sm",
                    isListening 
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/30 recording-pulse" 
                      : "bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                  ].join(' ')}
                >
                  <Mic size={20} className={isListening ? "animate-pulse" : ""} />
                </button>

                <button 
                  onClick={() => handleSend(message)}
                  aria-label="Send Message"
                  className="p-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all group active:scale-95"
                >
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <p className="mt-3 text-[9px] font-bold text-slate-400 text-center uppercase tracking-[0.2em]">
              Real-time Awareness • Intelligent Auto-Scroll
            </p>
          </div>
        </div>
      </div>
    );
  },


  notes: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">📝 My Note Hub</h2>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Capture your insights</p>
      </div>
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <textarea 
          placeholder="Start typing your study notes here..." 
          rows={15} 
          className="w-full px-8 py-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-100 outline-none resize-none focus:bg-white transition-all text-lg font-medium text-slate-700" 
        />
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Save Draft</button>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Publish Note</button>
        </div>
      </div>
    </div>
  ),

  progress: () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">📊 Learning Analytics</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Data-driven performance insights</p>
        </div>
        <select className="px-6 py-3 rounded-xl border border-slate-100 bg-white text-xs font-black uppercase tracking-widest text-slate-500 outline-none focus:ring-2 focus:ring-blue-100 shadow-sm">
          <option>Last 30 Days</option>
          <option>Semester 1</option>
          <option>Yearly View</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Study Time', value: '142.5h', change: '+12%', icon: '⏱️', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Content Mastery', value: '84%', change: '+5%', icon: '🎯', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Avg Assessment', value: '92%', change: '+3%', icon: '⭐', color: 'text-orange-500', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center text-2xl mb-6`}>
              {stat.icon}
            </div>
            <p className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{stat.value}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${stat.color} bg-opacity-20`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Subject Proficiency</h3>
        <div className="space-y-8">
          {[
            { name: 'Accessibility Standards', pct: 92, color: 'bg-blue-500' },
            { name: 'Interface Interaction', pct: 75, color: 'bg-indigo-500' },
            { name: 'Assistive Integration', pct: 60, color: 'bg-emerald-500' },
            { name: 'Cognitive Science', pct: 45, color: 'bg-orange-500' },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{item.name}</span>
                <span className="text-lg font-black text-slate-900">{item.pct}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  vision: () => (
    <div className="space-y-8">
      <div className="p-8 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight mb-2">👁️ Visual Assist Engine</h2>
          <p className="text-blue-100 text-lg font-medium opacity-90 max-w-xl">Real-time environmental narration and STEM-optimized image recognition.</p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-20"><Eye size={120} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'Scene Narrator', desc: 'Detailed audio descriptions of physical classrooms.', icon: '📷', btn: 'Activate Narrator' },
          { title: 'STEM Explainer', desc: 'Audio conversion for complex mathematical diagrams.', icon: '📊', btn: 'Upload Diagram' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <span className="text-5xl mb-6 block">{item.icon}</span>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">{item.desc}</p>
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  ),

  hearing: () => (
    <div className="space-y-8">
      <div className="p-8 rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight mb-2">👂 Auditory Hub</h2>
          <p className="text-emerald-100 text-lg font-medium opacity-90 max-w-xl">Live lecture transcription and auditory-to-visual alert conversion.</p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-20"><Ear size={120} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'Live Subtitles', desc: 'Real-time captions for lectures and discussions.', icon: '📝', btn: 'Enable Captions' },
          { title: 'Visual Alerts', desc: 'High-contrast visual pulses for auditory cues.', icon: '🚨', btn: 'Start Pulse Mode' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <span className="text-5xl mb-6 block">{item.icon}</span>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">{item.desc}</p>
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all">
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  ),

  speech: () => {
    const speak = (content) => {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    };

    return (
      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight mb-2">🗣️ Speech Synthesis</h2>
            <p className="text-indigo-100 text-lg font-medium opacity-90 max-w-xl">Empower your voice through high-fidelity AI-driven vocalization.</p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-20"><MessageSquare size={120} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Vocalize Panel', desc: 'Quick-access academic phrases and terminology.', icon: '🔊', text: 'Hello, I would like to participate in the discussion.' },
            { title: 'Chat-Bridge', desc: 'Instant text-to-speech for live participation.', icon: '💬', text: 'Can you please explain the last point again?' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <span className="text-5xl mb-6 block">{item.icon}</span>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">{item.desc}</p>
              <button 
                onClick={() => speak(item.text)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all"
              >
                Speak Sample
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  },

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

  signlang: () => <SignLangTranslator />,

  // Vision Support (For Blind Users)
  // Hearing Support (For Deaf Users)
  // Speech Support (For Mute Users)
  // Legacy accessibility tools
  texttospeech: () => <TextToSpeechReader />,

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
  texttovisuals: () => <TextToVisualsDashboard />,
  
  settings: () => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-gray-100 dark:border-slate-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-8">⚙️ Platform Preferences</h2>
      <div className="space-y-12">
        {[
          { label: 'Voice Interaction', desc: 'Enable hands-free navigation across the dashboard.', checked: true },
          { label: 'High Contrast Mode', desc: 'Optimized for visual impairments and light sensitivity.', checked: false },
          { label: 'Predictive Typing', desc: 'AI-driven suggestions for faster study notes.', checked: true },
        ].map((setting, i) => (
          <div key={i} className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800 pb-8 last:border-0 last:pb-0 group">
            <div className="max-w-xl">
              <p className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors tracking-tight">{setting.label}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">{setting.desc}</p>
            </div>
            <div className={`w-14 h-8 rounded-full ${setting.checked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'} relative cursor-pointer p-1 transition-all`}>
              <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform ${setting.checked ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export default function MainContent({ active, setActive, theme, focusMode }) {

  const dark  = theme === 'dark';
  const Panel = panels[active] || panels.dashboard;

  return (
    <main
      className={[`flex-1 overflow-y-auto ${focusMode ? 'p-12 md:p-24' : 'p-8'} transition-all duration-700`, focusMode ? 'max-w-4xl mx-auto' : ''].join(' ')}
      style={{ backgroundColor: dark ? '#0f172a' : '#f8fafc' }}
      aria-label="Main content"
    >
      <div className={focusMode ? 'w-full' : 'max-w-7xl mx-auto'}>
        <Panel onNavigate={setActive} focusMode={focusMode} theme={theme} />
      </div>
    </main>
  );
}
