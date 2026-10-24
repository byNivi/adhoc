'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Building2, UserCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'customer';

  const { signup } = useAuth();

  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!agreeTerms) {
      setError('Must accept terms to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, name, role, companyName);
      if (role === 'production_house') {
        router.push('/dashboard/production-house');
      } else {
        router.push('/dashboard/customer');
      }
    } catch {
      setError('Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] text-zinc-900 min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-yellow-300 border border-yellow-400 flex items-center justify-center text-zinc-950 font-black text-base shadow-glow-yellow">
              ad
            </div>
            <span className="text-2xl font-black text-zinc-900 tracking-tight">
              adhoc<span className="text-amber-500">.</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-zinc-900">Create Account</h1>
          <p className="text-xs text-zinc-500">
            {role === 'production_house'
              ? 'Join as an advertising production house.'
              : 'Join as a client or brand to commission work.'}
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

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Vikram Malhotra"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label={role === 'production_house' ? 'Studio / Entity Name' : 'Company or Brand Name (Optional)'}
              placeholder={role === 'production_house' ? 'e.g. CineCraft Studios' : 'e.g. Tata Consumer'}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <Input
              label="Work Email"
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password (min 6 chars)"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <label className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded accent-amber-500 cursor-pointer"
              />
              <span>I agree to marketplace SLA and production terms</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 text-xs"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Create {role === 'customer' ? 'Customer' : 'Production House'} Account
            </Button>
          </form>

          <div className="pt-3 border-t border-zinc-100 text-center text-xs text-zinc-500">
            Already registered?{' '}
            <Link href="/login" className="text-amber-800 hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero spam • Verified industry credentials</span>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <SignUpContent />
    </Suspense>
  );
}
