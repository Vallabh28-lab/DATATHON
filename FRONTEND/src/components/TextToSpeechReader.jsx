import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react';

const LESSON_TITLE = "Understanding Web Accessibility";

const LESSON_SENTENCES = [
  "Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them.",
  "More specifically, people can perceive, understand, navigate, and interact with the Web.",
  "Web accessibility encompasses all disabilities that affect access to the Web, including auditory, cognitive, neurological, physical, speech, and visual disabilities.",
  "Accessibility also benefits people without disabilities, for example, people using mobile phones or those with slow network connections."
];

// Web Audio Context for Earcon Generation
let globalAudioCtx = null;
let lastEarconTime = 0;

const playEarcon = () => {
  const now = Date.now();
  // Debounce rapidly sequenced click/focus to prevent double-beeps
  if (now - lastEarconTime < 100) return; 
  lastEarconTime = now;

  // Haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  // Audio earcon beep
  try {
    if (!globalAudioCtx) {
      globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
    const oscillator = globalAudioCtx.createOscillator();
    const gainNode = globalAudioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, globalAudioCtx.currentTime); // Pleasant mid-high beep
    
    gainNode.gain.setValueAtTime(0.05, globalAudioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, globalAudioCtx.currentTime + 0.15);
    
    oscillator.connect(gainNode);
    gainNode.connect(globalAudioCtx.destination);
    
    oscillator.start();
    oscillator.stop(globalAudioCtx.currentTime + 0.15);
  } catch (err) {
    // Graceful fallback if audio context blocked or not supported
  }
};

export default function TextToSpeechReader() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Lesson ready. Press Spacebar to play.');

  const handlePlayPause = () => {
    playEarcon();
    setIsPlaying((prev) => {
      const nextPlayState = !prev;
      setStatusMessage(nextPlayState ? 'Playing Audio Lesson' : 'Audio Paused');
      return nextPlayState;
    });
  };

  const handleRewind = () => {
    playEarcon();
    setStatusMessage('Rewound Audio 10 seconds');
  };

  const handleForward = () => {
    playEarcon();
    setStatusMessage('Skipped Forward Audio 10 seconds');
  };

  // Keyboard Global Listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in a generic input (if they existed)
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault(); 
        handlePlayPause();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleRewind();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleForward();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // Safe empty dependency because updater functions are used

  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFF00] p-8 md:p-16 pb-[600px] md:pb-[450px] font-sans selection:bg-[#FFFF00] selection:text-[#000000]">
      {/* ARIA Live Region for Status Announcements */}
      <div aria-live="assertive" className="sr-only" role="status" aria-atomic="true">
        {statusMessage}
      </div>

      <header className="mb-16 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] border-b-8 border-[#FFFF00] pb-8">
          {LESSON_TITLE}
        </h1>
      </header>

      <section className="space-y-12 max-w-7xl mx-auto" aria-label="Reading Content">
        {LESSON_SENTENCES.map((sentence, idx) => (
          <p 
            key={idx}
            tabIndex={0} 
            onFocus={playEarcon}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.4] focus:outline-none focus:ring-8 focus:ring-yellow-400 p-6 md:p-8 -ml-6 md:-ml-8 rounded-[2rem] cursor-pointer hover:bg-[#FFFF00]/10 transition-colors"
            onClick={() => {
               playEarcon();
               setIsPlaying(true);
               setStatusMessage(`Playing from sentence ${idx + 1}`);
            }}
          >
            {sentence}
          </p>
        ))}
      </section>

      {/* Massive Interaction Hit-Boxes Centered On Screen */}
      <nav aria-label="Text to speech controls" className="fixed bottom-0 left-0 right-0 bg-[#000000] border-t-[12px] border-[#FFFF00] p-8 md:p-12 z-50 shadow-[0_-20px_60px_-15px_rgba(255,255,0,0.3)] flex justify-center items-center">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-h-[50vh] overflow-y-auto md:overflow-visible">
          
          {/* Rewind Button */}
          <button 
            onClick={handleRewind}
            onFocus={playEarcon}
            aria-label="Rewind Audio Lesson 10 seconds"
            className="flex flex-col items-center justify-center gap-6 p-8 md:p-12 rounded-[3.5rem] border-[12px] border-[#FFFF00] bg-[#000000] text-[#FFFF00] focus:outline-none focus:ring-8 focus:ring-yellow-400 hover:bg-[#FFFF00] hover:text-[#000000] transition-colors group"
          >
            <RotateCcw className="w-20 h-20 md:w-28 md:h-28 group-hover:-rotate-12 transition-transform" strokeWidth={4} />
            <span className="text-3xl md:text-4xl font-black uppercase tracking-widest text-center" aria-hidden="true">Rewind 10s</span>
          </button>
          
          {/* Play/Pause Button */}
          <button 
            onClick={handlePlayPause}
            onFocus={playEarcon}
            aria-label={isPlaying ? 'Pause Audio Lesson' : 'Resume Audio Lesson'}
            className="flex flex-col items-center justify-center gap-6 p-8 md:p-12 rounded-[3.5rem] border-[12px] border-[#FFFF00] bg-[#000000] text-[#FFFF00] focus:outline-none focus:ring-8 focus:ring-yellow-400 hover:bg-[#FFFF00] hover:text-[#000000] transition-colors group"
          >
            {isPlaying ? (
              <Pause className="w-20 h-20 md:w-28 md:h-28 group-hover:scale-110 transition-transform" strokeWidth={4} />
            ) : (
              <Play className="ml-4 w-20 h-20 md:w-28 md:h-28 group-hover:scale-110 transition-transform" strokeWidth={4} />
            )}
            <span className="text-3xl md:text-4xl font-black uppercase tracking-widest text-center" aria-hidden="true">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>
          
          {/* Forward Button */}
          <button 
            onClick={handleForward}
            onFocus={playEarcon}
            aria-label="Skip Forward Audio Lesson 10 seconds"
            className="flex flex-col items-center justify-center gap-6 p-8 md:p-12 rounded-[3.5rem] border-[12px] border-[#FFFF00] bg-[#000000] text-[#FFFF00] focus:outline-none focus:ring-8 focus:ring-yellow-400 hover:bg-[#FFFF00] hover:text-[#000000] transition-colors group"
          >
            <RotateCw className="w-20 h-20 md:w-28 md:h-28 group-hover:rotate-12 transition-transform" strokeWidth={4} />
            <span className="text-3xl md:text-4xl font-black uppercase tracking-widest text-center" aria-hidden="true">Forward 10s</span>
          </button>

        </div>
      </nav>
    </main>
  );
}
