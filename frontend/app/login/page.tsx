'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Building2, UserCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo } = useAuth();

  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Provide work email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, role);
      if (role === 'production_house') {
        router.push('/dashboard/production-house');
      } else {
        router.push('/dashboard/customer');
      }
    } catch {
      setError('Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoRole: UserRole) => {
    loginAsDemo(demoRole);
    if (demoRole === 'production_house') {
      router.push('/dashboard/production-house');
    } else {
      router.push('/dashboard/customer');
    }
  };

  return (
    <div className="bg-[#FAFAFA] text-zinc-900 min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-glow-blue">
              ad
            </div>
            <span className="text-2xl font-black text-zinc-900 tracking-tight">
              adhoc<span className="text-blue-600">.</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-zinc-900">Sign In</h1>
          <p className="text-xs text-zinc-500">
            Access your production briefs and quotes.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-soft space-y-5">
          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-xl border border-zinc-200/60">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'customer'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/60'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <UserCircle2 className="w-3.5 h-3.5" />
              <span>Brand / Agency</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('production_house')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                role === 'production_house'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/60'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Studio</span>
            </button>
          </div>

          {/* Quick Demo Login Option */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-center space-y-2">
            <p className="text-[11px] font-semibold text-zinc-600">
              Instant Demo Access:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="flex-1 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg border border-zinc-200/90 shadow-xs transition-colors cursor-pointer"
              >
                Demo as Brand
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('production_house')}
                className="flex-1 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg border border-zinc-200/90 shadow-xs transition-colors cursor-pointer"
              >
                Demo as Studio
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              label="Work Email"
              type="email"
              required
              placeholder={role === 'customer' ? 'brand@aurorabev.com' : 'contact@pixelcraft.in'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div>
              <Input
                label="Password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
              />
              <div className="flex justify-end mt-1">
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 text-xs"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Sign In as {role === 'customer' ? 'Customer' : 'Production House'}
            </Button>
          </form>

          <div className="pt-3 border-t border-zinc-100 text-center text-xs text-zinc-500">
            No account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Create one
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted production credentials</span>
        </div>
      </div>
    </div>
  );
}
