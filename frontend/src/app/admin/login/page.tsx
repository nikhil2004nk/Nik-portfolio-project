'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authService } from '../../../features/auth/services/auth.service';
import { Button } from '../../../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');

    try {
      await authService.login(data);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-ink px-4">
      <div className="w-full max-w-md bg-panel p-8 rounded-lg border border-hairline shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-primary mb-2">Admin Login</h1>
          <p className="text-sm font-mono text-muted">// restricted access</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-alert font-mono">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-2 uppercase">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full bg-ink border border-hairline rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150"
            />
            {errors.password && (
              <p className="mt-2 text-xs text-alert font-mono">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-alert/10 border border-alert/20 rounded text-alert text-sm font-mono text-center">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? 'Authenticating...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
