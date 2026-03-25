import React from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect if already signed in
  if (isSignedIn) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-4xl">🎓</span>
          <span className="text-3xl font-black text-indigo-700">BoundlessEd</span>
        </div>

        {/* Clerk Sign In */}
        <SignIn 
          routing="path" 
          path="/"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
}
