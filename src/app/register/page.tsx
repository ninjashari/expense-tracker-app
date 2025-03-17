'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    defaultCurrency: 'USD'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          <h1 className="auth-title">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="auth-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="auth-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="username" className="auth-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>
            <div>
              <label htmlFor="defaultCurrency" className="auth-label">
                Default Currency
              </label>
              <div className="relative">
                <select
                  id="defaultCurrency"
                  name="defaultCurrency"
                  value={formData.defaultCurrency}
                  onChange={handleChange}
                  className="auth-input"
                  required
                >
                  {CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="auth-button">
              SIGN UP
            </button>
          </form>
          <div className="auth-footer">
            Already have an account?{' '}
            <Link href="/login" className="auth-link">
              Login
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