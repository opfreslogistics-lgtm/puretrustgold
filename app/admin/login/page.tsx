'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { adminAuth } from '@/lib/adminAuth';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (adminAuth.isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store admin session using auth utility
      adminAuth.setSession(data.token, data.name || 'Admin', data.email || email, data.refreshToken);
      
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-deep-charcoal border border-gold p-10 rounded-lg shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">Admin Login</h1>
          <p className="text-gray-400 text-sm">PureTrust Gold Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-900 text-red-400 p-4 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-gray-700 text-white p-4 focus:border-gold outline-none transition-colors"
              placeholder="admin@puretrustgold.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-gray-700 text-white p-4 focus:border-gold outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-4 uppercase font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          For security, admin access is restricted
        </p>
      </motion.div>
    </div>
  );
}

