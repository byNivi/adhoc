'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/Button';
import { 
  Sparkles, 
  Menu, 
  X, 
  Building2, 
  UserCircle2, 
  LogOut, 
  ChevronDown,
  Layers,
  Search,
  Bot
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, isAuthenticated, logout, loginAsDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Production Houses', href: '/explore' },
    { label: 'AI Assistant', href: '/ai-assistant', highlight: true },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
              <span className="font-extrabold text-xl tracking-tighter">ad</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-zinc-900 font-sans">
                adhoc<span className="text-blue-600">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 -mt-1">
                Production Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-zinc-900 bg-zinc-100 font-semibold border border-zinc-200/80'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
                  } ${link.highlight ? 'text-blue-600 font-semibold' : ''}`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 border border-zinc-200 transition-colors cursor-pointer"
                title="Preview role perspectives"
              >
                <span>Demo View</span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </button>

              {demoMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-zinc-200 p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setDemoMenuOpen(false)}
                >
                  <p className="text-[11px] font-semibold text-zinc-400 px-2 py-1 uppercase tracking-wider">
                    Quick Role Preview
                  </p>
                  <button
                    onClick={() => {
                      loginAsDemo('customer');
                      setDemoMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <UserCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Customer Demo (Sarah)</span>
                  </button>
                  <button
                    onClick={() => {
                      loginAsDemo('production_house');
                      setDemoMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Production House (Studio Bombay)</span>
                  </button>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href={
                    role === 'production_house'
                      ? '/dashboard/production-house'
                      : '/dashboard/customer'
                  }
                >
                  <Button variant="secondary" size="sm" className="gap-2">
                    {role === 'production_house' ? (
                      <>
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span>Studio Dashboard</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold">
                          85%
                        </span>
                      </>
                    ) : (
                      <>
                        <UserCircle2 className="w-4 h-4 text-blue-600" />
                        <span>My Dashboard</span>
                      </>
                    )}
                  </Button>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="sm">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/signup?role=production_house">
                  <Button variant="primary" size="sm">
                    Join as Production House
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.highlight && <Sparkles className="w-4 h-4 text-blue-600" />}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href={
                    role === 'production_house'
                      ? '/dashboard/production-house'
                      : '/dashboard/customer'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="primary" className="w-full">
                    Open {role === 'production_house' ? 'Studio' : 'Customer'} Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={logout} className="w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
                <Link href="/signup?role=production_house" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Join as Production House
                  </Button>
                </Link>
              </>
            )}

            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => {
                  loginAsDemo('customer');
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg font-medium"
              >
                Demo: Customer
              </button>
              <button
                onClick={() => {
                  loginAsDemo('production_house');
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg font-medium"
              >
                Demo: Production House
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
