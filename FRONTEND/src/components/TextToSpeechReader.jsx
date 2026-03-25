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

// ---------- Speed presets ----------
const SPEEDS = [
  { label: '🐢', value: 0.75, title: 'Slow (0.75×)' },
  { label: '1×', value: 1, title: 'Normal (1×)' },
  { label: '🐇', value: 1.25, title: 'Fast (1.25×)' },
];

export default function TextToSpeechReader({ focusMode, theme }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [speed, setSpeed] = useState(1);
  
  // Simplified View Data
  const [simplifiedSteps, setSimplifiedSteps] = useState([]);
  const [loadingSimplified, setLoadingSimplified] = useState(false);

  const utteranceRef = useRef(null);
  const indexRef = useRef(-1);
  const speedRef = useRef(1);
  const isPlayingRef = useRef(false);
  const sentenceRefs = useRef([]);

  // Keep refs in sync
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

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

  // Fetch Simplified Steps when Focus Mode is active
  useEffect(() => {
    if (focusMode && simplifiedSteps.length === 0) {
      const fetchSimplified = async () => {
        setLoadingSimplified(true);
        try {
          const content = ALL_SENTENCES.join(' ');
          const response = await askAI(content); // askAI now points to /ai/simplify in api.js
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
    if (index >= ALL_SENTENCES.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentIndex(-1);
      indexRef.current = -1;
      return;
    }

    const utt = new SpeechSynthesisUtterance(ALL_SENTENCES[index]);
    utt.lang = 'en-IN';
    utt.rate = speedRef.current;

    utt.onstart = () => {
      setCurrentIndex(index);
      indexRef.current = index;
    };

    utt.onend = () => {
      if (isPlayingRef.current) {
        speakSentence(index + 1);
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
    const newIdx = Math.min(ALL_SENTENCES.length - 1, (currentIndex >= 0 ? currentIndex : -1) + 1);
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    setIsPaused(false);
    speakSentence(newIdx);
  }, [currentIndex, speakSentence]);

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
    ? Math.round(((currentIndex + 1) / ALL_SENTENCES.length) * 100)
    : 0;

  return (
    <div className={[
      "tts-reader-root space-y-8 pb-40 transition-all duration-700",
      focusMode ? "font-focus-mode focus-mode-active max-w-3xl mx-auto" : ""
    ].join(' ')}>
      {/* Header - Hide in Focus Mode */}
      {!focusMode && (
        <div className="pt-4 animate-in fade-in duration-700">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Volume2 size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {LESSON_TITLE}
              </h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
                {LESSON_SUBTITLE}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Simplified View OR Standard View */}
      {focusMode ? (
        <SimplifiedCardView 
          steps={simplifiedSteps} 
          theme={theme} 
          onExit={() => {}} // Could be used to toggle focusMode if we pass setFocusMode
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {LESSON_PARAGRAPHS.map((para, pIdx) => {
          const sectionSentences = para.sentences.map((sentence, sIdx) => {
            const thisGlobal = globalIdx++;
            return (
              <span
                key={thisGlobal}
                ref={(el) => { sentenceRefs.current[thisGlobal] = el; }}
                className={`tts-sentence inline transition-all duration-300 rounded-lg px-1 py-0.5 ${
                  currentIndex === thisGlobal ? 'tts-highlight' : ''
                }`}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlaying(true);
                  setIsPaused(false);
                  speakSentence(thisGlobal);
                }}
                style={{ cursor: 'pointer' }}
                title="Click to read from here"
              >
                {sentence}{' '}
              </span>
            );
          });

          return (
            <div key={pIdx} className="p-8 border-b border-slate-50 dark:border-slate-800 last:border-b-0">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-sm font-black">
                  {pIdx + 1}
                </span>
                {para.heading}
              </h3>
              <p className="text-base leading-[1.9] text-slate-600 dark:text-slate-300 font-medium">
                {sectionSentences}
              </p>
            </div>
          );
        })}
      </div>
      )}

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
            {/* Waveform Visualizer - Enhanced for Deaf Students */}
            <div className="flex items-center gap-2">
              <div className="tts-waveform" aria-label={isPlaying ? "Audio is playing" : "Audio is not playing"}>
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className={`tts-wave-bar ${isPlaying ? 'tts-wave-bar--active' : ''}`}
                    style={{ 
                      animationDelay: `${i * 0.05}s`,
                      height: isPlaying ? undefined : `${4 + (i % 3) * 2}px`
                    }}
                  />
                ))}
              </div>
              {isPlaying && (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 animate-pulse hidden sm:inline">
                  Audio Active
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
                {currentIndex >= 0 ? currentIndex + 1 : 0}/{ALL_SENTENCES.length}
              </span>
            </div>
          </div>

          {/* Right: Speed Controls */}
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
        </div>
      </div>
    </div>
  );
}
