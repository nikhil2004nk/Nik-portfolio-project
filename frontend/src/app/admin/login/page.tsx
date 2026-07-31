'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '../../../lib/admin-api';
import { Button } from '../../../components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminApi.login({ email, password });
      router.push('/admin');
    } catch (err: any) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-ink px-4">
      <div className="w-full max-w-md bg-panel p-8 rounded-lg border border-hairline shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-primary mb-2">Admin Login</h1>
          <p className="text-sm font-mono text-muted">// restricted access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
            />
          </div>

          {error && (
            <div className="p-3 bg-alert/10 border border-alert/20 rounded text-alert text-sm font-mono text-center">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full h-12" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
