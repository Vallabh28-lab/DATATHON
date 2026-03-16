import React, { useState } from 'react';

// Inline SVG icons to avoid extra dependencies
const Icon = {
  Eye: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ),
  GraduationCap: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Contrast: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 12l-4.24-4.24" />
    </svg>
  ),
  Text: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  User: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Monitor: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Keyboard: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Volume: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  ),
};

const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓' },
  { id: 'teacher', label: 'Teacher', emoji: '📚' },
  { id: 'admin',   label: 'Admin',   emoji: '⚙️' },
];

const FEATURES = [
  { icon: Icon.Monitor, title: 'Screen Reader Ready', desc: 'Full ARIA support & semantic HTML' },
  { icon: Icon.Keyboard, title: 'Keyboard Navigable', desc: 'No mouse required — fully tab-friendly' },
  { icon: Icon.Sparkles, title: 'High Contrast Mode', desc: 'Optimised for low-vision users' },
  { icon: Icon.Volume, title: 'Audio Descriptions', desc: 'Course content with audio narration' },
];

export default function AuthPage() {
  const [isLogin, setIsLogin]               = useState(true);
  const [showPassword, setShowPassword]     = useState(false);
  const [role, setRole]                     = useState('student');
  const [rememberMe, setRememberMe]         = useState(false);
  const [highContrast, setHighContrast]     = useState(false);
  const [largeText, setLargeText]           = useState(false);

  // Derive dynamic class roots
  const hc  = highContrast;
  const lt  = largeText;

  // ─── Class helpers ───────────────────────────────────────────────────────
  const root = [
    'flex flex-col md:flex-row min-h-screen w-full transition-all duration-300',
    hc ? 'bg-black text-white' : '',
    lt ? 'text-lg' : '',
  ].join(' ');

  const inputCls = [
    'w-full px-4 py-3 rounded-xl border-2 outline-none transition-all',
    lt ? 'text-lg py-4' : '',
    hc
      ? 'bg-black border-white text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400 focus:ring-offset-0'
      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500 focus:ring-offset-0',
  ].join(' ');

  const labelCls = ['block mb-1.5 font-semibold', lt ? 'text-lg' : 'text-sm', hc ? 'text-white' : 'text-slate-700'].join(' ');

  const primaryBtn = [
    'w-full flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 hover:-translate-y-0.5',
    lt ? 'py-4 text-xl' : 'py-3.5 text-base',
    hc
      ? 'bg-yellow-400 text-black border-2 border-yellow-400 hover:bg-yellow-500 focus-visible:ring-yellow-400 shadow-[4px_4px_0_white]'
      : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 focus-visible:ring-indigo-500',
  ].join(' ');

  return (
    <div className={root} role="main">

      {/* ── SKIP NAV LINK (keyboard-only) ──────────── */}
      <a
        href="#login-form-section"
        className={
          [
            // Visually hidden by default
            'sr-only',
            // Becomes visible on keyboard focus
            'focus:not-sr-only',
            'focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2',
            'focus:z-50 focus:px-6 focus:py-3 focus:rounded-full',
            'focus:text-sm focus:font-bold focus:shadow-xl',
            'focus:outline-none focus:ring-4',
            hc
              ? 'focus:bg-yellow-400 focus:text-black focus:ring-yellow-400/60'
              : 'focus:bg-indigo-600 focus:text-white focus:ring-indigo-500/40',
          ].join(' ')
        }
      >
        Skip to Login
      </a>

      {/* ── LEFT PANEL ─────────────────────────────── */}
      <aside
        className={[
          'relative w-full md:w-5/12 lg:w-[45%] flex flex-col p-12 lg:p-20 overflow-hidden',
          hc ? 'bg-black border-r-4 border-white' : 'bg-gradient-to-b from-slate-500 to-indigo-500 text-white',
        ].join(' ')}
        aria-label="Platform information"
      >
        {/* Soft overlay to reduce saturation */}
        {!hc && <div className="absolute inset-0 bg-black/10 pointer-events-none z-0"></div>}

        {/* Decorative blobs */}
        {!hc && (
          <>
            <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl z-0" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 rounded-full bg-violet-600/30 blur-3xl z-0" />
          </>
        )}

        <div className="relative z-10 flex flex-col h-full">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-12" role="banner">
            <div className={['p-2.5 rounded-xl', hc ? 'bg-yellow-400' : 'bg-white/20 backdrop-blur-sm'].join(' ')}>
              <Icon.GraduationCap className={['w-8 h-8', hc ? 'text-black' : 'text-white'].join(' ')} />
            </div>
            <span className={['text-2xl font-extrabold tracking-tight', lt ? 'text-3xl' : ''].join(' ')}>
              Boundless<span className={hc ? ' text-yellow-400' : ' text-indigo-300'}>Ed</span>
            </span>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className={['font-black tracking-tight leading-tight mb-5', lt ? 'text-5xl' : 'text-4xl md:text-5xl'].join(' ')}>
              Learning <br />
              <span className={hc ? 'text-yellow-400' : 'text-indigo-200'}>without limits.</span>
            </h1>
            <p className={['max-w-md mb-16 leading-relaxed', lt ? 'text-xl' : 'text-lg', hc ? 'text-gray-300' : 'text-indigo-100/90'].join(' ')}>
              The most accessible education platform — designed from the ground up for differently-abled learners.
            </p>

            {/* Feature list */}
            <ul className="space-y-8" aria-label="Platform accessibility features">
              {FEATURES.map(f => (
                <li key={f.title} className="flex items-start gap-4">
                  <div className={['p-2 rounded-lg shrink-0 mt-0.5', hc ? 'bg-black border border-white' : 'bg-white/10 backdrop-blur-sm'].join(' ')} aria-hidden="true">
                    <f.icon className={['w-6 h-6', hc ? 'text-yellow-400' : 'text-indigo-200'].join(' ')} />
                  </div>
                  <div>
                    <p className={['font-semibold', lt ? 'text-lg' : 'text-base'].join(' ')}>{f.title}</p>
                    <p className={['mt-1 outline-none', lt ? 'text-base' : 'text-sm', hc ? 'text-gray-400' : 'text-indigo-200/80'].join(' ')}>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <p className={['mt-10 text-xs', hc ? 'text-gray-500' : 'text-indigo-300/70'].join(' ')}>
            © {new Date().getFullYear()} Boundless Ed · All rights reserved
          </p>
        </div>
      </aside>

      {/* ── RIGHT PANEL ────────────────────────────── */}
      <div
        id="login-form-section"
        className={['flex flex-col w-full md:w-7/12 lg:w-[55%] relative', hc ? 'bg-black' : 'bg-slate-100'].join(' ')}
        aria-label="Authentication section"
        tabIndex={-1}
      >
        {/* Decorative subtle background for right panel to make glass pop */}
        {!hc && (
          <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent z-0 pointer-events-none" />
        )}

        {/* Accessibility toolbar */}
        <div
          className={['flex items-center justify-end gap-2 px-6 py-3 border-b', hc ? 'border-white/30 bg-black' : 'border-slate-200 bg-white'].join(' ')}
          role="toolbar"
          aria-label="Accessibility options"
        >
          <span className={['text-xs font-medium mr-2 hidden sm:inline', hc ? 'text-gray-400' : 'text-slate-400'].join(' ')}>
            Accessibility:
          </span>

          <button
            onClick={() => setLargeText(prev => !prev)}
            aria-pressed={largeText}
            aria-label="Toggle large text mode"
            className={[
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
              largeText
                ? (hc ? 'bg-yellow-400 text-black border-yellow-400 focus-visible:ring-yellow-400 shadow-[2px_2px_0_white]' : 'bg-indigo-100 text-indigo-800 border-indigo-400 focus-visible:ring-indigo-500 shadow-sm')
                : (hc ? 'bg-transparent text-white border-white hover:bg-white/10 focus-visible:ring-white hover:shadow-[2px_2px_0_white]' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 focus-visible:ring-indigo-500 hover:shadow-sm'),
            ].join(' ')}
          >
            <Icon.Text className="w-4 h-4" />
            <span className="hidden sm:inline">Increase Text</span>
          </button>

          <button
            onClick={() => setHighContrast(prev => !prev)}
            aria-pressed={highContrast}
            aria-label="Toggle high contrast mode"
            className={[
              'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
              hc
                ? 'bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500 focus-visible:ring-yellow-400 shadow-[2px_2px_0_white]'
                : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 focus-visible:ring-indigo-500 hover:shadow-md hover:shadow-slate-900/20',
            ].join(' ')}
          >
            <Icon.Contrast className="w-4 h-4" />
            <span className="hidden sm:inline">High Contrast</span>
          </button>
        </div>

        {/* Form wrapper */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-10">
          <div className={[
            'w-full max-w-md p-10 md:p-12 rounded-3xl transition-all',
            hc 
              ? 'bg-black border-2 border-white' 
              : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5'
          ].join(' ')}>

            {/* Heading */}
            <div className="mb-12">
              <h2 className={['font-black tracking-tight mb-2', lt ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl', hc ? 'text-white' : 'text-slate-900'].join(' ')}>
                {isLogin ? 'Welcome back 👋' : 'Create account'}
              </h2>
              <p className={['leading-relaxed', lt ? 'text-xl' : 'text-base', hc ? 'text-gray-400' : 'text-slate-600'].join(' ')}>
                {isLogin
                  ? 'Sign in to continue your learning journey.'
                  : 'Join Boundless Ed — accessible learning starts here.'}
              </p>
            </div>

            {/* ── FORM ── */}
            <form
              onSubmit={e => e.preventDefault()}
              aria-label={isLogin ? 'Login form' : 'Registration form'}
              noValidate
            >

              {/* Role Selector */}
              <fieldset className="mb-6">
                <legend className={[labelCls, 'mb-3'].join(' ')}>I am a…</legend>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Select your role">
                  {ROLES.map(r => (
                    <label
                      key={r.id}
                      htmlFor={`role-${r.id}`}
                      className={[
                        'flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:outline-none',
                        lt ? 'text-base py-4' : 'text-sm',
                        role === r.id
                          ? (hc ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 font-bold has-[:focus-visible]:ring-yellow-400' : 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-md has-[:focus-visible]:ring-indigo-500 scale-[1.02]')
                          : (hc ? 'border-white/30 text-gray-400 hover:border-white has-[:focus-visible]:ring-yellow-400' : 'border-slate-200 text-slate-500 hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 has-[:focus-visible]:ring-indigo-500 bg-white'),
                      ].join(' ')}
                    >
                      <input
                        id={`role-${r.id}`}
                        type="radio"
                        name="role"
                        value={r.id}
                        checked={role === r.id}
                        onChange={() => setRole(r.id)}
                        className="sr-only"
                        aria-label={`Role: ${r.label}`}
                      />
                      <span className="text-xl" role="img" aria-label="">{r.emoji}</span>
                      {r.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Full Name (sign-up only) */}
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="full-name" className={labelCls}>Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <Icon.User className={['w-5 h-5', hc ? 'text-gray-400' : 'text-slate-400'].join(' ')} />
                    </span>
                    <input
                      id="full-name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-label="Full name"
                      placeholder="Jane Doe"
                      className={inputCls + ' pl-10'}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className={labelCls}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-label="Email address"
                  placeholder="jane@example.com"
                  className={inputCls}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className={['font-semibold', lt ? 'text-lg' : 'text-sm', hc ? 'text-white' : 'text-slate-700'].join(' ')}>
                    Password
                  </label>
                  {isLogin && (
                    <a
                      href="#"
                      className={['text-sm font-medium hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-1 rounded', hc ? 'text-yellow-400 focus-visible:ring-yellow-400' : 'text-indigo-600 focus-visible:ring-indigo-500'].join(' ')}
                      aria-label="Forgot password? Click to reset"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    aria-required="true"
                    aria-label="Password"
                    placeholder="••••••••"
                    className={inputCls + ' pr-12'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className={['absolute inset-y-0 right-3 flex items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 rounded', hc ? 'text-yellow-400 focus-visible:ring-yellow-400' : 'text-slate-400 hover:text-indigo-600 focus-visible:ring-indigo-500'].join(' ')}
                  >
                    {showPassword ? <Icon.EyeOff className="w-5 h-5" /> : <Icon.Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              {isLogin && (
                <div className="flex items-center gap-2.5 mb-6">
                  <button
                    type="button"
                    role="checkbox"
                    id="remember-me"
                    aria-checked={rememberMe}
                    aria-label="Remember me"
                    onClick={() => setRememberMe(p => !p)}
                    className={[
                      'w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
                      rememberMe
                        ? (hc ? 'bg-yellow-400 border-yellow-400 focus-visible:ring-yellow-400' : 'bg-indigo-600 border-indigo-600 focus-visible:ring-indigo-500')
                        : (hc ? 'border-white bg-black focus-visible:ring-white' : 'border-slate-300 bg-white hover:border-indigo-400 focus-visible:ring-indigo-500'),
                    ].join(' ')}
                  >
                    {rememberMe && <Icon.Check className={['w-3.5 h-3.5', hc ? 'text-black' : 'text-white'].join(' ')} />}
                  </button>
                  <label
                    htmlFor="remember-me"
                    className={[lt ? 'text-base' : 'text-sm', hc ? 'text-gray-300' : 'text-slate-600', 'cursor-pointer select-none'].join(' ')}
                    onClick={() => setRememberMe(p => !p)}
                  >
                    Remember me on this device
                  </label>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={primaryBtn}
                aria-label={isLogin ? 'Sign in to Boundless Ed' : 'Create your Boundless Ed account'}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Switch mode */}
            <p className={['mt-6 text-center', lt ? 'text-base' : 'text-sm', hc ? 'text-gray-400' : 'text-slate-500'].join(' ')}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(p => !p)}
                className={['font-bold hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 rounded px-1', hc ? 'text-yellow-400 focus-visible:ring-yellow-400 bg-transparent' : 'text-indigo-600 focus-visible:ring-indigo-500'].join(' ')}
                aria-label={isLogin ? 'Switch to sign up' : 'Switch to login'}
              >
                {isLogin ? 'Sign up free →' : 'Log in →'}
              </button>
            </p>

            {/* WCAG note */}
            <p className={['mt-8 text-center text-xs flex items-center justify-center gap-1.5', hc ? 'text-gray-600' : 'text-slate-400'].join(' ')}>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              WCAG 2.1 AA compliant · Designed for all abilities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
