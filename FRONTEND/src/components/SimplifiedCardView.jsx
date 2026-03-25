import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { extractKeyword } from '../services/api';

export default function SimplifiedCardView({ steps, onExit, theme }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const dark = theme === 'dark';

  // Fetch Visual Anchor (Keyword + Image) when the step changes
  useEffect(() => {
    if (steps && steps[currentStep]) 
      {
      const fetchVisualAnchor = async () => {
        setLoadingImage(true);
        try {
          const response = await extractKeyword(steps[currentStep]);
          if (response.data && response.data.keyword) {
            const kw = response.data.keyword;
            setKeyword(kw);
            // Use a reliable placeholder service for keywords
            setImageUrl(`https://loremflickr.com/600/400/${encodeURIComponent(kw)}`);
          }
        } catch (err) {
          console.error("Failed to fetch visual anchor:", err);
          setImageUrl('');
        } finally {
          setLoadingImage(false);
        }
      };
      fetchVisualAnchor();
    }
  }, [currentStep, steps]);

  if (!steps || steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center animate-pulse">
        <Sparkles size={48} className="text-blue-500 mb-4 animate-spin-slow" />
        <p className="text-xl font-black text-slate-400 uppercase tracking-widest">
          AI is simplifying your lesson...
        </p>
      </div>
    );
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="simplified-view-container flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* Progress Tracker */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-end mb-4">
          <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/20"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Visual Anchor - AI Identifies the most important object */}
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 items-center">

        {/* The Actionable Card */}
        <div className={[
          "relative flex-1 min-h-[300px] p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col justify-center text-center",
          dark
            ? "bg-slate-900 border-slate-800 shadow-2xl"
            : "bg-white border-slate-100 shadow-2xl shadow-slate-200/50"
        ].join(' ')}>

          <div className="absolute -top-6 left-10 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
            <Sparkles size={24} />
          </div>

          <p className={[
            "text-xl md:text-2xl font-bold leading-relaxed tracking-tight",
            dark ? "text-slate-100" : "text-slate-800"
          ].join(' ')}>
            {steps[currentStep]}
          </p>

          {currentStep === steps.length - 1 && (
            <div className="mt-8">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
              <p className="mt-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">Mastery Achieved!</p>
            </div>
          )}
        </div>

        {/* Visual Anchor Image */}
        <div className="w-full md:w-72 shrink-0 animate-in zoom-in fade-in duration-700 delay-300">
          <div className={[
            "aspect-square rounded-[2rem] overflow-hidden border-4 shadow-2xl flex flex-col items-center justify-center relative group",
            dark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-white"
          ].join(' ')}>
            {loadingImage ? (
              <div className="animate-pulse flex flex-col items-center gap-3">
                <ImageIcon size={32} className="text-slate-300" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Finding Anchor...</span>
              </div>
            ) : imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={keyword}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  key={imageUrl}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Visual Anchor: {keyword}</p>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <ImageIcon size={32} className="text-slate-200 mx-auto mb-2" />
                <p className="text-[10px] font-black text-slate-300 uppercase">No anchor found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className={[
            "w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90 border",
            currentStep === 0
              ? "opacity-20 cursor-not-allowed"
              : (dark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-100 text-slate-900 shadow-lg hover:shadow-xl")
          ].join(' ')}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          className={[
            "px-12 h-16 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl disabled:opacity-20 flex items-center gap-4",
            currentStep === steps.length - 1 ? "" : "hover:bg-blue-600 dark:hover:bg-blue-50"
          ].join(' ')}
        >
          {currentStep === steps.length - 1 ? "Finished" : "Next Step"}
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-mono">
        Zen Mode • Dyslexic Friendly • AI Assisted
      </p>
    </div>
  );
}
