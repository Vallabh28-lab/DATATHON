import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, Square, Volume2, SkipBack, SkipForward, Sparkles } from 'lucide-react';
import SimplifiedCardView from './SimplifiedCardView';
import { askAI } from '../services/api';

// ---------- Sample Lesson Content ----------
const LESSON_TITLE = "Understanding Web Accessibility";
const LESSON_SUBTITLE = "Module 3 — Perceivable Content for Every Learner";

const LESSON_PARAGRAPHS = [
  {
    heading: "What is Web Accessibility?",
    sentences: [
      "Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them.",
      "More specifically, people can perceive, understand, navigate, and interact with the Web.",
      "Web accessibility encompasses all disabilities that affect access to the Web, including auditory, cognitive, neurological, physical, speech, and visual disabilities.",
      "Accessibility also benefits people without disabilities, for example, people using mobile phones or those with slow network connections.",
    ],
  },
  {
    heading: "The POUR Principles",
    sentences: [
      "The Web Content Accessibility Guidelines, commonly known as WCAG, are organized around four principles often called POUR.",
      "Perceivable means that information and user interface components must be presentable to users in ways they can perceive.",
      "Operable means that user interface components and navigation must be operable by everyone.",
      "Understandable means that information and the operation of the user interface must be understandable.",
      "Robust means that content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.",
    ],
  },
  {
    heading: "Why Accessibility Matters",
    sentences: [
      "The power of the Web is in its universality, and access by everyone regardless of disability is an essential aspect.",
      "Over one billion people, about fifteen percent of the world's population, have some form of disability.",
      "An accessible Web empowers people with disabilities to participate more actively in society.",
      "Accessibility overlaps with other best practices such as mobile web design, usability, and search engine optimization.",
      "Many countries have laws requiring digital accessibility, making it both a moral and legal imperative.",
    ],
  },
  {
    heading: "Assistive Technologies in Education",
    sentences: [
      "Screen readers convert digital text into synthesized speech or Braille output for visually impaired students.",
      "Text-to-speech tools help students with dyslexia or reading difficulties by reading content aloud.",
      "Closed captions and real-time subtitles ensure that deaf and hard-of-hearing students can follow lectures.",
      "Alternative input devices such as eye trackers and switch controls enable students with motor disabilities to navigate learning platforms.",
      "Accessible educational technology creates an inclusive environment where every student can thrive.",
    ],
  },
];

// Flatten all sentences for sequential TTS
const ALL_SENTENCES = LESSON_PARAGRAPHS.flatMap((p) => p.sentences);

export default function TextToSpeechReader({ focusMode, theme }) {
  const SPEEDS = [
    { label: '0.75×', value: 0.75, title: 'Slow' },
    { label: '1×', value: 1, title: 'Normal' },
    { label: '1.5×', value: 1.5, title: 'Fast' },
    { label: '2×', value: 2, title: 'Very Fast' },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [loop, setLoop] = useState(false);
  const [useCustomText, setUseCustomText] = useState(false);
  const [customText, setCustomText] = useState('');
  const [allText, setAllText] = useState(ALL_SENTENCES);
  const textareaRef = useRef(null);
  
  // Simplified View Data
  const [simplifiedSteps, setSimplifiedSteps] = useState([]);
  const [loadingSimplified, setLoadingSimplified] = useState(false);

  const utteranceRef = useRef(null);
  const indexRef = useRef(-1);
const speedRef = useRef(1);
  const volumeRef = useRef(1);
  const isPlayingRef = useRef(false);
  const sentenceRefs = useRef([]);

  // Web Audio Visualizer
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const visualizerRafRef = useRef(null);
  const dataArrayRef = useRef(null);

// Keep refs in sync
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices.filter(v => v.lang.startsWith('en')));
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Web Audio Visualizer Init
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArrayRef.current[i] / 255) * canvas.height * 0.8;
        const r = barHeight + 25 * (i / bufferLength);
        const g = 250 * (1 - i / bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }

      visualizerRafRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  // Auto-scroll the highlighted sentence into view
  useEffect(() => {
    if (currentIndex >= 0 && sentenceRefs.current[currentIndex]) {
      sentenceRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Update allText when customText or lesson changes
  useEffect(() => {
    if (useCustomText) {
      const sentences = customText.split(/[.!?]+/).filter(s => s.trim()).map(s => s.trim() + '.');
      setAllText(sentences);
    } else {
      setAllText(ALL_SENTENCES);
    }
  }, [useCustomText, customText]);

  // Fetch Simplified Steps when Focus Mode is active
  useEffect(() => {
    if (focusMode && simplifiedSteps.length === 0) {
      const fetchSimplified = async () => {
        setLoadingSimplified(true);
        try {
          const content = ALL_SENTENCES.join(' ');
          const response = await askAI(content);
          if (response.data && response.data.steps) {
            setSimplifiedSteps(response.data.steps);
          }
        } catch (err) {
          console.error("Failed to simplify:", err);
        } finally {
          setLoadingSimplified(false);
        }
      };
      fetchSimplified();
    }
  }, [focusMode, simplifiedSteps.length]);

const speakSentence = useCallback((index) => {
    if (index >= allText.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentIndex(-1);
      indexRef.current = -1;
      return;
    }

    const utt = new SpeechSynthesisUtterance(allText[index]);
    utt.lang = 'en-IN';
    utt.rate = speedRef.current;
    utt.volume = volumeRef ? volumeRef.current : 1;
    if (selectedVoice) {
      utt.voice = selectedVoice;
    }

    utt.onstart = () => {
      setCurrentIndex(index);
      indexRef.current = index;
    };

    utt.onend = () => {
      if (isPlayingRef.current) {
        if (index + 1 >= allText.length && loop) {
          speakSentence(0);
        } else if (index + 1 < allText.length) {
          speakSentence(index + 1);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
        }
      }
    };

    utt.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.error('TTS Error:', e.error);
      }
    };

    utteranceRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, []);

  // ---------- Controls ----------
  const handlePlay = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setIsPaused(false);
    const startIdx = currentIndex >= 0 ? currentIndex : 0;
    speakSentence(startIdx);
  }, [isPaused, currentIndex, speakSentence]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIndex(-1);
    indexRef.current = -1;
  }, []);

  const handlePrev = useCallback(() => {
    const newIdx = Math.max(0, (currentIndex > 0 ? currentIndex : 1) - 1);
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setIsPaused(false);
    speakSentence(newIdx);
  }, [currentIndex, speakSentence]);

  const handleNext = useCallback(() => {
    const newIdx = Math.min(allText.length - 1, (currentIndex >= 0 ? currentIndex : -1) + 1);
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setIsPaused(false);
    speakSentence(newIdx);
  }, [currentIndex, speakSentence, allText.length]);

  const handleSpeedChange = useCallback((val) => {
    setSpeed(val);
    // If currently speaking, restart the current sentence at new speed
    if (isPlayingRef.current && indexRef.current >= 0) {
      window.speechSynthesis.cancel();
      setTimeout(() => speakSentence(indexRef.current), 50);
    }
  }, [speakSentence]);

  // ---------- Sentence index mapping ----------
  let globalIdx = 0;

  const progress = currentIndex >= 0
    ? Math.round(((currentIndex + 1) / allText.length) * 100)
    : 0;

  return (
    <div className={[
      "tts-reader-root space-y-8 pb-40 transition-all duration-700 bg-gradient-to-b from-slate-900 via-gray-900 to-black min-h-screen",
      focusMode ? "font-focus-mode focus-mode-active max-w-3xl mx-auto" : ""
    ].join(' ')}>
      {/* Input Toggle & Custom Text */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setUseCustomText(false)}
            className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex-1 ${
              !useCustomText 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-xl shadow-cyan-500/30' 
                : 'bg-white/10 backdrop-blur-sm text-white/80 border border-white/20 hover:bg-white/20'
            }`}
            aria-pressed={!useCustomText}
          >
            Lesson Content
          </button>
          <button
            onClick={() => setUseCustomText(true)}
            className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex-1 ${
              useCustomText 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-xl shadow-cyan-500/30' 
                : 'bg-white/10 backdrop-blur-sm text-white/80 border border-white/20 hover:bg-white/20'
            }`}
            aria-pressed={useCustomText}
          >
            Custom Text
          </button>
        </div>

        {useCustomText && (
          <div 
            className="w-full p-6 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 mb-8 transition-all hover:shadow-cyan-500/40"
            onDrop={(e) => {
              e.preventDefault();
              const text = e.dataTransfer.getData('text/plain');
              setCustomText(text);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <textarea
              ref={textareaRef}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste or type text here... Drag-drop files or copy-paste from anywhere!"
              className="w-full h-48 p-6 bg-transparent border-none outline-none text-lg leading-relaxed text-white/95 placeholder-white/60 resize-vertical font-medium tracking-wide"
              aria-label="Custom text input for TTS"
            />
          </div>
        )}
      </div> {/* Close max-w-4xl p-8 input container */}

      {/* Header - Hide in Focus Mode */}
      {!focusMode && (
        <div className="pt-4 animate-in fade-in duration-700">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/40 ring-2 ring-white/20">
              <Volume2 size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
                {LESSON_TITLE}
              </h1>
              <p className="text-sm font-bold text-cyan-200 uppercase tracking-widest mt-1 drop-shadow-md">
                {LESSON_SUBTITLE}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content Container - Premium Frosted Glass */}
      <div className="max-w-4xl mx-auto p-12">
        {/* Simplified View OR Standard View */}
        {focusMode ? (
          <SimplifiedCardView 
            steps={simplifiedSteps} 
            theme={theme} 
            onExit={() => {}} 
          />
        ) : (
          <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-cyan-400/40 shadow-2xl shadow-cyan-500/30 p-12 overflow-hidden ring-1 ring-cyan-500/20">
            <div className="space-y-6">
              {allText.map((sentence, idx) => (
                <div key={idx} className="group">
                  <span
                    ref={(el) => { sentenceRefs.current[idx] = el; }}
                    className={`tts-sentence block p-6 rounded-2xl transition-all duration-500 cursor-pointer hover:bg-white/20 hover:shadow-xl hover:shadow-white/10 group-hover:scale-[1.02] border border-white/10 ${
                      currentIndex === idx ? 'tts-highlight bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-2xl shadow-yellow-400/50 scale-105 ring-4 ring-yellow-300/50' : ''
                    }`}
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      setIsPlaying(true);
                      setIsPaused(false);
                      speakSentence(idx);
                    }}
                    title="Click to read from here"
                    tabIndex={0}
                    role="button"
                    aria-label={`Read sentence ${idx + 1}`}
                  >
                    {sentence}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ Sticky "Read Aloud" Bar ═══════════ */}
      <div className="tts-fab-bar" aria-label="Text-to-Speech Reader Controls">
        <div className="tts-fab-inner">

          {/* Left: Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous sentence"
              className="tts-ctrl-btn"
              title="Previous sentence"
            >
              <SkipBack size={16} />
            </button>

            {isPlaying ? (
              <button
                onClick={handlePause}
                aria-label="Pause reading"
                className="tts-play-btn tts-play-btn--active"
                title="Pause"
              >
                <Pause size={20} />
              </button>
            ) : (
              <button
                onClick={handlePlay}
                aria-label={isPaused ? "Resume reading" : "Start reading"}
                className="tts-play-btn"
                title={isPaused ? "Resume" : "Play"}
              >
                <Play size={20} className="ml-0.5" />
              </button>
            )}

            <button
              onClick={handleStop}
              aria-label="Stop reading"
              className="tts-ctrl-btn"
              title="Stop"
            >
              <Square size={14} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next sentence"
              className="tts-ctrl-btn"
              title="Next sentence"
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* Center: Waveform + Progress */}
          <div className="flex items-center gap-6">
            {/* Real Web Audio Visualizer */}
            <div className="flex items-center gap-2 relative">
              <canvas
                ref={canvasRef}
                className="tts-audio-canvas"
                aria-label={isPlaying ? "Live audio visualization" : "Visualizer ready"}
              />
              <div className="tts-canvas-overlay" />
              {isPlaying && (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 animate-pulse hidden sm:inline">
                  Live Audio
                </span>
              )}
            </div>

            {/* Status */}
            <div className="hidden sm:flex items-center gap-2">
              {isPlaying && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              )}
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {isPlaying ? 'Speaking' : isPaused ? 'Paused' : 'Ready'}
              </span>
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-slate-400 tabular-nums">
                {currentIndex >= 0 ? currentIndex + 1 : 0}/{allText.length}
              </span>
            </div>
          </div>

          {/* Right: Controls - Speed, Volume, Voice, Loop */}
          <div className="flex items-center gap-3">
            {/* Speed */}
            <div className="flex items-center gap-1">
              {SPEEDS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSpeedChange(s.value)}
                  aria-label={s.title}
                  title={s.title}
                  className={`tts-speed-btn ${speed === s.value ? 'tts-speed-btn--active' : ''}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Volume */}
            <div className="flex items-center gap-1 text-xs whitespace-nowrap">
              <span className="font-bold text-slate-700">Vol</span>
              <input
                type="range"
                min="0" max="1" step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-600 hover:accent-blue-500 appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                aria-label="Volume"
              />
              <span className="w-5 font-mono text-slate-600">{Math.round(volume * 10)}</span>
            </div>
            {/* Voice Select */}
            <select 
              value={selectedVoice?.name || ''}
              onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value) || null)}
              className="px-1.5 py-0.5 text-xs rounded bg-white/90 border border-slate-200 focus:ring focus:ring-blue-400 text-slate-800 font-medium min-w-[90px] max-w-[140px]"
              aria-label="Voice selection"
            >
              <option value="">Auto</option>
              {voices.slice(0,8).map((v) => (
                <option key={v.name} value={v.name}>{v.name.split(' (')[0]}</option>
              ))}
            </select>
            {/* Loop Toggle */}
            <button
              onClick={() => setLoop(!loop)}
              className={`p-1.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md ${loop 
                ? 'bg-emerald-500 text-white shadow-emerald-300/50 hover:bg-emerald-600 hover:shadow-emerald-400/50' 
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-800'
              }`}
              aria-label={`Toggle loop ${loop ? 'on' : 'off'}`}
              aria-pressed={loop}
              title="Loop playback"
            >
              🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
