import React from 'react';
import { SignUp } from '@clerk/react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-4xl">🎓</span>
          <span className="text-3xl font-black text-indigo-700">BoundlessEd</span>
        </div>

        {/* Clerk Sign Up */}
        <SignUp 
          routing="path" 
          path="/sign-up"
          signInUrl="/"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}
