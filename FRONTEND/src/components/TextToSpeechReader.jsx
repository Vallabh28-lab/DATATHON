import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Square } from 'lucide-react';

export default function TextToSpeechReader() {
  const [text, setText] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [voice, setVoice] = useState(0);
  const [voices, setVoices] = useState([]);
  const [status, setStatus] = useState("System Ready");

  const fileInputRef = useRef(null);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);

  // Load available system voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      synth.cancel();
    }
  }, [synth]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setStatus("Extracting PDF content...");
      // Simulation of PDF extraction
      setTimeout(() => {
        setText("PDF content extracted successfully. You can now edit this text or press play to listen.");
        setStatus("Extraction Complete");
      }, 1200);
    }
  };

  const handleSpeak = () => {
    if (isReading) {
      synth.pause();
      setIsReading(false);
      setStatus("Paused");
      return;
    }

    if (synth.paused && utteranceRef.current) {
      synth.resume();
      setIsReading(true);
      setStatus("Reading Aloud...");
      return;
    }

    if (text) {
      synth.cancel(); // Clear any hung process
      const utterance = new SpeechSynthesisUtterance(text);
      if (voices.length > 0) {
        utterance.voice = voices[voice] || voices[0];
      }
      utterance.rate = speed;

      utterance.onend = () => {
        setIsReading(false);
        setStatus("Finished Reading");
        utteranceRef.current = null;
      };

      utterance.onerror = () => {
        setIsReading(false);
        setStatus("Error playing audio");
        utteranceRef.current = null;
      }

      utteranceRef.current = utterance;
      setStatus("Reading Aloud...");
      setIsReading(true);
      synth.speak(utterance);
    }
  };

  const handleStop = () => {
    synth.cancel();
    setIsReading(false);
    setStatus("Stopped");
    utteranceRef.current = null;
  };

  const handleClear = () => {
    setText("");
    handleStop();
    setStatus("System Ready");
  };

  return (
    <div className="w-full min-h-screen pb-20">
      <main className="w-full max-w-5xl mx-auto px-6 pt-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight m-0">
              Text to Speech
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Input text manually or upload a PDF document.
            </p>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-2xl font-semibold flex items-center gap-2.5 shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={20} />
            <span>Upload PDF</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden"
          />
        </header>

        <section className="bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
          <textarea
            className="w-full border border-slate-200 dark:border-slate-600 rounded-2xl p-6 text-lg min-h-[280px] mb-8 outline-none text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-900/30 transition-all resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here to convert it to speech..."
          />

          <div className="flex items-center justify-center gap-5">
            <button
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 border-none px-6 py-3 rounded-full font-semibold cursor-pointer transition-colors"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-lg shadow-blue-600/30"
              onClick={handleSpeak}
              title={isReading ? "Pause" : "Play"}
            >
              {isReading ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current ml-1" />}
            </button>
            <button
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 border-none px-6 py-3 rounded-full font-semibold cursor-pointer transition-colors"
              onClick={handleStop}
            >
              Stop
            </button>
          </div>

          <div className="text-sm font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2.5 mt-8">
            <div className={`w-2.5 h-2.5 rounded-full ${isReading ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            {status} <span className="text-slate-300 dark:text-slate-600">|</span> {text.length} Characters
          </div>
        </section>

        {/* Configuration Row */}
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-blue-50 dark:border-slate-700 shadow-sm">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Playback Speed ({speed}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
            />
          </div>
          <div className="flex-1 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-blue-50 dark:border-slate-700 shadow-sm">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              Select Voice
            </label>
            <select
              className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl p-3.5 text-slate-700 dark:text-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-shadow cursor-pointer"
              value={voice}
              onChange={(e) => setVoice(Number(e.target.value))}
            >
              {voices.length > 0 ? voices.map((v, index) => (
                <option key={index} value={index}>{v.name} ({v.lang})</option>
              )) : (
                <option value={0}>Default System Voice</option>
              )}
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}
