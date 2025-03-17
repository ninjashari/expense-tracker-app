'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      username,
      password,
      callbackUrl: '/'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900">
      <nav className="bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link 
              href="/" 
              className="text-white text-xl font-bold hover:text-purple-200 transition-colors"
            >
              Finance Manager
            </Link>
          </div>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="auth-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>
            <Link href="/forgot-password" className="auth-link text-sm">
              Forgot your password?
            </Link>
            <button type="submit" className="auth-button">
              LOGIN
            </button>
          </form>
          <div className="auth-footer">
            Don't have account?{' '}
            <Link href="/register" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
        
        <div className="auth-decoration">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.1 }}
          >
            <path
              d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 