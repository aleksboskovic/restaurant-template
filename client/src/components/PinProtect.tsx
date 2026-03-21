import { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, Utensils } from 'lucide-react';
import { trpc } from '@/lib/trpc';

const STORAGE_KEY = 'habesha_dashboard_auth';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 Stunden

function isSessionValid(): boolean {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    const { expiry } = JSON.parse(stored);
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

function saveSession(): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
    expiry: Date.now() + SESSION_DURATION_MS,
  }));
}

interface PinProtectProps {
  children: React.ReactNode;
}

export default function PinProtect({ children }: PinProtectProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const verifyMutation = trpc.pin.verify.useMutation({
    onSuccess: (data) => {
      if (data.valid) {
        saveSession();
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Falscher PIN. Bitte erneut versuchen.');
        setIsShaking(true);
        setPin('');
        setTimeout(() => {
          setIsShaking(false);
          inputRef.current?.focus();
        }, 600);
      }
    },
    onError: () => {
      setError('Verbindungsfehler. Bitte erneut versuchen.');
      setIsShaking(true);
      setPin('');
      setTimeout(() => {
        setIsShaking(false);
        inputRef.current?.focus();
      }, 600);
    },
  });

  useEffect(() => {
    if (isSessionValid()) {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isChecking) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAuthenticated, isChecking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Bitte mindestens 4 Ziffern eingeben.');
      return;
    }
    verifyMutation.mutate({ pin });
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0f1a15] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0f1a15] flex items-center justify-center px-4">
      {/* Ethiopian flag top bar */}
      <div className="fixed top-0 left-0 right-0 h-1 flex z-50">
        <div className="flex-1" style={{ background: '#078930' }} />
        <div className="flex-1" style={{ background: '#FCDD09' }} />
        <div className="flex-1" style={{ background: '#DA121A' }} />
      </div>

      <div
        className={`w-full max-w-sm transition-all duration-300 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={isShaking ? { animation: 'shake 0.5s ease-in-out' } : {}}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#d4af37]/20">
            <Utensils size={28} className="text-[#1a3a32]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">HABESHA</h1>
          <p className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Bestellungs-Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a3a32] rounded-2xl p-8 border border-[#d4af37]/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
              <Lock size={18} className="text-[#d4af37]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Geschützter Bereich</p>
              <p className="text-white/40 text-xs">Bitte PIN eingeben</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={e => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 8));
                  setError('');
                }}
                placeholder="PIN eingeben"
                inputMode="numeric"
                autoComplete="current-password"
                className={`w-full bg-[#0f1a15] text-white text-center text-2xl tracking-[0.5em] font-bold rounded-xl px-5 py-4 pr-12 border outline-none transition-all placeholder:text-white/20 placeholder:text-base placeholder:tracking-normal ${
                  error
                    ? 'border-red-500/60 focus:border-red-400'
                    : 'border-white/10 focus:border-[#d4af37]/60'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPin(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* PIN dots indicator */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.max(4, pin.length) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i < pin.length
                      ? 'bg-[#d4af37] scale-110'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pin.length < 4 || verifyMutation.isPending}
              className="w-full py-3.5 rounded-xl font-bold text-[#1a3a32] text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: '#d4af37' }}
            >
              {verifyMutation.isPending ? 'Prüfen...' : 'Einloggen'}
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-6">
            Session läuft 8 Stunden · Nur für Restaurantpersonal
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-8px); }
          30%, 70% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
