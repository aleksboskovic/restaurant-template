import { useState, useEffect, useRef, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import PinProtect from '@/components/PinProtect';
import {
  CheckCircle, Clock, Phone, Mail, MapPin, Utensils,
  RefreshCw, Volume2, VolumeX, History, TrendingUp,
  Search, LogOut, ChevronDown, ChevronUp, X, Package, KeyRound, Eye, EyeOff,
  ShoppingBag, ShoppingCart,
} from 'lucide-react';

type OrderStatus = 'new' | 'in_progress' | 'done';
type Tab = 'live' | 'history';

interface OrderItem {
  dishName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName: string;
  phone: string;
  email: string;
  items: OrderItem[];
  totalPrice: number;
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  deliveryTime: string;
  paymentMethod: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('de-AT', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function thirtyDaysAgoISO() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().slice(0, 10);
}

function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.setValueAtTime(660, ctx.currentTime + 0.15);
    oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.8, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.6);
  } catch { /* ignore */ }
}

function logout() {
  sessionStorage.removeItem('habesha_dashboard_auth');
  window.location.reload();
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

// ─── PIN Change Dialog ───────────────────────────────────────────────────────

function PinChangeDialog({ onClose }: { onClose: () => void }) {
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const changePinMutation = trpc.pin.change.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Clear session so user must log in with new PIN
        sessionStorage.removeItem('habesha_dashboard_auth');
        window.location.reload();
      }, 2000);
    },
    onError: (err) => {
      setError(err.message || 'Fehler beim Ändern des PINs.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\d{4}$/.test(newPin)) { setError('Neuer PIN muss genau 4 Ziffern sein.'); return; }
    if (newPin !== confirmPin) { setError('Die neuen PINs stimmen nicht überein.'); return; }
    if (oldPin.length < 4) { setError('Bitte alten PIN eingeben.'); return; }
    changePinMutation.mutate({ oldPin, newPin });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-[#1a3a32] rounded-2xl p-8 w-full max-w-sm border border-[#d4af37]/30 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
              <KeyRound size={18} className="text-[#d4af37]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">PIN ändern</p>
              <p className="text-white/40 text-xs">Alten PIN bestätigen, dann neuen eingeben</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={28} className="text-green-400" />
            </div>
            <p className="text-green-400 font-semibold">PIN erfolgreich geändert!</p>
            <p className="text-white/40 text-xs mt-1">Sie werden abgemeldet...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Old PIN */}
            <div>
              <label className="text-white/60 text-xs mb-1.5 block">Alter PIN</label>
              <div className="relative">
                <input
                  type={showOld ? 'text' : 'password'}
                  value={oldPin}
                  onChange={e => { setOldPin(e.target.value.replace(/\D/g, '').slice(0, 8)); setError(''); }}
                  placeholder="Aktuellen PIN eingeben"
                  inputMode="numeric"
                  className="w-full bg-[#0f1a15] text-white text-center text-xl tracking-[0.4em] font-bold rounded-xl px-5 py-3 pr-10 border border-white/10 focus:border-[#d4af37]/60 outline-none placeholder:text-white/20 placeholder:text-sm placeholder:tracking-normal"
                />
                <button type="button" onClick={() => setShowOld(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New PIN */}
            <div>
              <label className="text-white/60 text-xs mb-1.5 block">Neuer PIN (4 Ziffern)</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPin}
                  onChange={e => { setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
                  placeholder="Neuen 4-stelligen PIN"
                  inputMode="numeric"
                  maxLength={4}
                  className="w-full bg-[#0f1a15] text-white text-center text-xl tracking-[0.4em] font-bold rounded-xl px-5 py-3 pr-10 border border-white/10 focus:border-[#d4af37]/60 outline-none placeholder:text-white/20 placeholder:text-sm placeholder:tracking-normal"
                />
                <button type="button" onClick={() => setShowNew(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* PIN dots */}
              <div className="flex justify-center gap-2 mt-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i < newPin.length ? 'bg-[#d4af37] scale-110' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            {/* Confirm PIN */}
            <div>
              <label className="text-white/60 text-xs mb-1.5 block">Neuen PIN bestätigen</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPin}
                  onChange={e => { setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
                  placeholder="PIN wiederholen"
                  inputMode="numeric"
                  maxLength={4}
                  className={`w-full bg-[#0f1a15] text-white text-center text-xl tracking-[0.4em] font-bold rounded-xl px-5 py-3 pr-10 border outline-none placeholder:text-white/20 placeholder:text-sm placeholder:tracking-normal ${
                    confirmPin.length === 4 && confirmPin !== newPin ? 'border-red-500/60' :
                    confirmPin.length === 4 && confirmPin === newPin ? 'border-green-500/60' :
                    'border-white/10 focus:border-[#d4af37]/60'
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 text-sm font-semibold hover:bg-white/5 transition-all">
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={changePinMutation.isPending || oldPin.length < 4 || newPin.length < 4 || confirmPin.length < 4}
                className="flex-1 py-3 rounded-xl bg-[#d4af37] text-[#1a3a32] text-sm font-bold hover:bg-[#d4af37]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {changePinMutation.isPending ? 'Speichern...' : 'PIN ändern'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function LiveOrdersDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('live');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastOrderCount, setLastOrderCount] = useState<number | null>(null);
  const [justUpdated, setJustUpdated] = useState<string | null>(null);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [orderToggleLoading, setOrderToggleLoading] = useState(false);

  const updateStatus = trpc.orders.updateStatus.useMutation();
  const utils = trpc.useUtils();

  // ── Orders enabled state (DB-persisted) ──
  const { data: orderSettingsData, refetch: refetchOrderSettings } = trpc.orderSettings.getEnabled.useQuery();
  const ordersEnabled = orderSettingsData?.enabled ?? true;
  const setEnabledMutation = trpc.orderSettings.setEnabled.useMutation({
    onSuccess: () => {
      refetchOrderSettings();
      setOrderToggleLoading(false);
    },
    onError: () => setOrderToggleLoading(false),
  });

  const handleToggleOrders = () => {
    setOrderToggleLoading(true);
    setEnabledMutation.mutate({ enabled: !ordersEnabled });
  };

  const { data: orders = [], isLoading, refetch } = trpc.orders.getActive.useQuery(undefined, {
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (lastOrderCount === null) { setLastOrderCount(orders.length); return; }
    if (orders.length > lastOrderCount && soundEnabled) playNotificationSound();
    setLastOrderCount(orders.length);
  }, [orders.length]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setJustUpdated(orderId);
    await updateStatus.mutateAsync({ orderId, status: newStatus });
    await utils.orders.getActive.invalidate();
    setTimeout(() => setJustUpdated(null), 800);
  };

  const newOrders = (orders as Order[]).filter(o => o.status === 'new');
  const inProgressOrders = (orders as Order[]).filter(o => o.status === 'in_progress');

  return (
    <div className="min-h-screen bg-[#0f1a15] text-white">
      {/* ── Header ── */}
      <div className="bg-[#1a3a32] border-b border-[#d4af37]/30 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0">
              <Utensils size={18} className="text-[#1a3a32]" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-white leading-none">HABESHA</h1>
              <p className="text-[#d4af37] text-[10px] tracking-widest uppercase">Dashboard</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#0f1a15]/60 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'live'
                  ? 'bg-[#d4af37] text-[#1a3a32]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeTab === 'live' ? 'bg-[#1a3a32]' : 'bg-green-400'} animate-pulse`} />
              Live
              {newOrders.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {newOrders.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-[#d4af37] text-[#1a3a32]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <History size={14} />
              Verlauf
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {activeTab === 'live' && (
              <>
                <button
                  onClick={() => setSoundEnabled(s => !s)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    soundEnabled ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-white/10 text-white/40'
                  }`}
                >
                  {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  <span className="hidden sm:inline">{soundEnabled ? 'Ton an' : 'Ton aus'}</span>
                </button>
                <button
                  onClick={() => refetch()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20 transition-all"
                >
                  <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                  <span className="hidden sm:inline">Aktualisieren</span>
                </button>
              </>
            )}
            {/* BESTELLUNG STOPPEN / AKTIVIEREN */}
            <button
              onClick={handleToggleOrders}
              disabled={orderToggleLoading}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all border-2 ${
                ordersEnabled
                  ? 'bg-red-600 hover:bg-red-700 text-white border-red-500'
                  : 'bg-green-600 hover:bg-green-700 text-white border-green-500'
              } disabled:opacity-60`}
              title={ordersEnabled ? 'Bestellungen stoppen' : 'Bestellungen aktivieren'}
            >
              {orderToggleLoading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : ordersEnabled ? (
                <ShoppingCart size={14} />
              ) : (
                <ShoppingBag size={14} />
              )}
              <span className="hidden sm:inline">
                {ordersEnabled ? 'BESTELLUNG STOPPEN' : 'BESTELLUNG AKTIVIEREN'}
              </span>
              <span className="sm:hidden">
                {ordersEnabled ? 'STOPP' : 'AKTIV'}
              </span>
            </button>

            {/* PIN ändern */}
            <button
              onClick={() => setShowPinDialog(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37]/20 text-xs font-semibold transition-all"
              title="PIN ändern"
            >
              <KeyRound size={14} />
              <span className="hidden sm:inline">PIN ändern</span>
            </button>
            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 text-xs font-semibold transition-all"
              title="Abmelden"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </div>
        </div>
      </div>

      {/* PIN Change Dialog */}
      {showPinDialog && <PinChangeDialog onClose={() => setShowPinDialog(false)} />}

      {/* ── Content ── */}
      {activeTab === 'live' ? (
        <LiveTab
          orders={orders as Order[]}
          newOrders={newOrders}
          inProgressOrders={inProgressOrders}
          isLoading={isLoading}
          justUpdated={justUpdated}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <HistoryTab />
      )}
    </div>
  );
}

// ─── Live Tab ────────────────────────────────────────────────────────────────

function LiveTab({
  orders, newOrders, inProgressOrders, isLoading, justUpdated, onStatusChange,
}: {
  orders: Order[];
  newOrders: Order[];
  inProgressOrders: Order[];
  isLoading: boolean;
  justUpdated: string | null;
  onStatusChange: (id: string, status: OrderStatus) => void;
}) {
  return (
    <>
      {/* Stats bar */}
      <div className="bg-[#1a3a32]/40 border-b border-white/5 px-4 py-2">
        <div className="max-w-7xl mx-auto flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-white/60 text-sm">Neu:</span>
            <span className="text-white font-bold">{newOrders.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-white/60 text-sm">In Bearbeitung:</span>
            <span className="text-white font-bold">{inProgressOrders.length}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">LIVE</span>
            <span className="text-white/30 text-xs">· alle 10 Sek.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading && orders.length === 0 ? (
          <div className="text-center py-20">
            <RefreshCw size={36} className="animate-spin text-[#d4af37] mx-auto mb-4" />
            <p className="text-white/50">Bestellungen werden geladen...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[#1a3a32] flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h2 className="font-serif text-xl text-white mb-2">Alles erledigt!</h2>
            <p className="text-white/40 text-sm">Neue Bestellungen erscheinen automatisch.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <h2 className="text-red-400 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                Neue Bestellungen ({newOrders.length})
              </h2>
              <div className="space-y-4">
                {newOrders.map(order => (
                  <OrderCard key={order._id} order={order}
                    onAccept={() => onStatusChange(order._id, 'in_progress')}
                    onDone={() => onStatusChange(order._id, 'done')}
                    isUpdating={justUpdated === order._id} variant="new" />
                ))}
                {newOrders.length === 0 && (
                  <div className="text-center py-8 text-white/20 text-sm border border-white/10 rounded-2xl">
                    Keine neuen Bestellungen
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-yellow-400 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                In Bearbeitung ({inProgressOrders.length})
              </h2>
              <div className="space-y-4">
                {inProgressOrders.map(order => (
                  <OrderCard key={order._id} order={order}
                    onAccept={() => onStatusChange(order._id, 'in_progress')}
                    onDone={() => onStatusChange(order._id, 'done')}
                    isUpdating={justUpdated === order._id} variant="in_progress" />
                ))}
                {inProgressOrders.length === 0 && (
                  <div className="text-center py-8 text-white/20 text-sm border border-white/10 rounded-2xl">
                    Keine Bestellungen in Bearbeitung
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── History Tab ─────────────────────────────────────────────────────────────

function HistoryTab() {
  const [dateFrom, setDateFrom] = useState(thirtyDaysAgoISO());
  const [dateTo, setDateTo] = useState(todayISO());
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: history = [], isLoading: histLoading } = trpc.orders.getHistory.useQuery({
    dateFrom,
    dateTo,
    limit: 200,
  });

  const { data: dayStats = [] } = trpc.orders.getDayStats.useQuery({
    dateFrom,
    dateTo,
  });

  // Client-side full-text search across all fields
  const filtered = useMemo(() => {
    if (!search.trim()) return history as Order[];
    const q = search.toLowerCase();
    return (history as Order[]).filter(o => {
      const itemNames = o.items?.map(i => i.dishName).join(' ').toLowerCase() ?? '';
      return (
        o.customerName?.toLowerCase().includes(q) ||
        o.phone?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q) ||
        o.deliveryAddress?.toLowerCase().includes(q) ||
        o.notes?.toLowerCase().includes(q) ||
        itemNames.includes(q) ||
        o.totalPrice?.toString().includes(q) ||
        o.orderType?.toLowerCase().includes(q) ||
        o.paymentMethod?.toLowerCase().includes(q)
      );
    });
  }, [history, search]);

  // Summary stats for filtered results
  const totalRevenue = filtered.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const deliveryCount = filtered.filter(o => o.orderType === 'delivery').length;
  const pickupCount = filtered.filter(o => o.orderType === 'pickup').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* ── Filter bar ── */}
      <div className="bg-[#1a3a32]/60 rounded-2xl p-4 border border-white/10">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-white/40 text-xs uppercase tracking-wider">Von</label>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="bg-[#0f1a15] text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:border-[#d4af37]/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white/40 text-xs uppercase tracking-wider">Bis</label>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="bg-[#0f1a15] text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:border-[#d4af37]/50 outline-none"
            />
          </div>
          {/* Quick filters */}
          <div className="flex gap-2 flex-wrap">
            {[
              { label: 'Heute', from: todayISO(), to: todayISO() },
              { label: '7 Tage', from: (() => { const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().slice(0, 10); })(), to: todayISO() },
              { label: '30 Tage', from: thirtyDaysAgoISO(), to: todayISO() },
            ].map(q => (
              <button
                key={q.label}
                onClick={() => { setDateFrom(q.from); setDateTo(q.to); }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  dateFrom === q.from && dateTo === q.to
                    ? 'bg-[#d4af37] text-[#1a3a32]'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Suche nach Name, Produkt, Adresse, Bestellwert, Zahlungsart..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0f1a15] text-white text-sm rounded-xl pl-9 pr-9 py-2.5 border border-white/10 focus:border-[#d4af37]/50 outline-none placeholder:text-white/20"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Bestellungen', value: filtered.length, color: 'text-white', sub: `${deliveryCount} Lieferung · ${pickupCount} Abholung` },
          { label: 'Gesamtumsatz', value: `${totalRevenue.toFixed(2)} €`, color: 'text-[#d4af37]', sub: filtered.length > 0 ? `Ø ${(totalRevenue / filtered.length).toFixed(2)} € / Bestellung` : '–' },
          { label: 'Lieferungen', value: deliveryCount, color: 'text-blue-400', sub: filtered.length > 0 ? `${Math.round(deliveryCount / filtered.length * 100)}% der Bestellungen` : '–' },
          { label: 'Abholungen', value: pickupCount, color: 'text-green-400', sub: filtered.length > 0 ? `${Math.round(pickupCount / filtered.length * 100)}% der Bestellungen` : '–' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#1a3a32]/60 rounded-2xl p-4 border border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Day-by-day stats ── */}
      {dayStats.length > 0 && !search && (
        <div className="bg-[#1a3a32]/40 rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
            <TrendingUp size={15} className="text-[#d4af37]" />
            <span className="text-white/70 text-sm font-semibold">Tagesübersicht</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-2 text-white/30 text-xs font-medium">Datum</th>
                  <th className="text-right px-4 py-2 text-white/30 text-xs font-medium">Bestellungen</th>
                  <th className="text-right px-4 py-2 text-white/30 text-xs font-medium">Umsatz</th>
                  <th className="text-right px-4 py-2 text-white/30 text-xs font-medium hidden sm:table-cell">Lieferung</th>
                  <th className="text-right px-4 py-2 text-white/30 text-xs font-medium hidden sm:table-cell">Abholung</th>
                </tr>
              </thead>
              <tbody>
                {(dayStats as Array<{ date: string; orderCount: number; totalRevenue: number; deliveryCount: number; pickupCount: number }>).map(day => (
                  <tr key={day.date} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2.5 text-white font-medium">{formatDateShort(day.date + 'T12:00:00Z')}</td>
                    <td className="px-4 py-2.5 text-right text-white">{day.orderCount}</td>
                    <td className="px-4 py-2.5 text-right text-[#d4af37] font-semibold">{day.totalRevenue.toFixed(2)} €</td>
                    <td className="px-4 py-2.5 text-right text-blue-400 hidden sm:table-cell">{day.deliveryCount}</td>
                    <td className="px-4 py-2.5 text-right text-green-400 hidden sm:table-cell">{day.pickupCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Order list ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white/50 text-xs font-semibold uppercase tracking-widest">
            {search ? `${filtered.length} Treffer` : `${filtered.length} erledigte Bestellungen`}
          </h2>
        </div>

        {histLoading ? (
          <div className="text-center py-16">
            <RefreshCw size={32} className="animate-spin text-[#d4af37] mx-auto mb-3" />
            <p className="text-white/40 text-sm">Verlauf wird geladen...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-2xl">
            <Package size={32} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/30 text-sm">
              {search ? 'Keine Bestellungen gefunden.' : 'Keine erledigten Bestellungen in diesem Zeitraum.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(order => (
              <HistoryOrderRow
                key={order._id}
                order={order}
                isExpanded={expandedId === order._id}
                onToggle={() => setExpandedId(expandedId === order._id ? null : order._id)}
                searchQuery={search}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── History Order Row (collapsible) ─────────────────────────────────────────

function highlightMatch(text: string, query: string) {
  if (!query.trim() || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#d4af37]/40 text-white rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function HistoryOrderRow({ order, isExpanded, onToggle, searchQuery }: {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  searchQuery: string;
}) {
  return (
    <div className={`rounded-xl border transition-all ${isExpanded ? 'border-[#d4af37]/30 bg-[#1a3a32]/60' : 'border-white/10 bg-[#1a3a32]/30 hover:bg-[#1a3a32]/50'}`}>
      {/* Row header – always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {highlightMatch(order.customerName, searchQuery)}
            </p>
            <p className="text-white/40 text-xs">{formatDate(order.createdAt)} {formatTime(order.createdAt)}</p>
          </div>
          <div className="hidden sm:block">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              order.orderType === 'delivery' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {order.orderType === 'delivery' ? '🛵 Lieferung' : '🏠 Abholung'}
            </span>
          </div>
          <div className="hidden sm:block text-white/50 text-xs truncate">
            {order.items?.map(i => `${i.quantity}× ${i.dishName}`).join(', ')}
          </div>
          <div className="text-right">
            <span className="text-[#d4af37] font-bold text-sm">{order.totalPrice?.toFixed(2)} €</span>
          </div>
        </div>
        <div className="text-white/30 flex-shrink-0">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-3">
          {/* Contact */}
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`tel:${order.phone}`} className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
              <Phone size={13} />{highlightMatch(order.phone, searchQuery)}
            </a>
            <span className="flex items-center gap-1.5 text-white/60">
              <Mail size={13} />{highlightMatch(order.email, searchQuery)}
            </span>
          </div>

          {order.orderType === 'delivery' && order.deliveryAddress && (
            <div className="flex items-start gap-1.5 text-white/60 text-sm">
              <MapPin size={13} className="mt-0.5 flex-shrink-0" />
              {highlightMatch(order.deliveryAddress, searchQuery)}
            </div>
          )}

          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <Clock size={13} />
            {order.deliveryTime === 'asap' ? 'So schnell wie möglich' : `Wunschzeit: ${order.deliveryTime}`}
          </div>

          {/* Items */}
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-2">Bestellung</p>
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
                <span className="text-white">
                  <span className="text-[#d4af37] font-bold mr-2">{item.quantity}×</span>
                  {highlightMatch(item.dishName, searchQuery)}
                </span>
                <span className="text-white/50">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 mt-1 border-t border-white/10">
              <span className="text-white/50 font-semibold">Gesamt</span>
              <span className="text-[#d4af37] font-bold">{order.totalPrice?.toFixed(2)} €</span>
            </div>
          </div>

          {order.notes && (
            <div className="bg-white/5 rounded-xl p-3 text-sm text-white/50">
              <span className="text-white/30 font-semibold">Anmerkung: </span>
              {highlightMatch(order.notes, searchQuery)}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
              order.paymentMethod === 'card' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {order.paymentMethod === 'card' ? '💳 Karte' : '💵 Bar'}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400 font-semibold">
              ✓ Erledigt
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Live Order Card ──────────────────────────────────────────────────────────

function OrderCard({ order, onAccept, onDone, isUpdating, variant }: {
  order: Order;
  onAccept: () => void;
  onDone: () => void;
  isUpdating: boolean;
  variant: 'new' | 'in_progress';
}) {
  return (
    <div className={`rounded-2xl border p-5 transition-all ${
      isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    } ${variant === 'new' ? 'bg-red-950/30 border-red-500/40' : 'bg-yellow-950/20 border-yellow-500/30'}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              variant === 'new' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {variant === 'new' ? 'NEU' : 'IN BEARBEITUNG'}
            </span>
            <span className="text-white/40 text-xs">
              {order.orderType === 'delivery' ? '🛵 Lieferung' : '🏠 Abholung'}
            </span>
          </div>
          <h3 className="font-bold text-white text-lg">{order.customerName}</h3>
        </div>
        <div className="text-right">
          <div className="text-[#d4af37] font-bold text-xl">{order.totalPrice?.toFixed(2)} €</div>
          <div className="text-white/40 text-xs flex items-center gap-1 justify-end">
            <Clock size={10} />{formatTime(order.createdAt)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        <a href={`tel:${order.phone}`} className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
          <Phone size={13} />{order.phone}
        </a>
        <span className="flex items-center gap-1.5 text-white/60">
          <Mail size={13} />{order.email}
        </span>
      </div>

      {order.orderType === 'delivery' && order.deliveryAddress && (
        <div className="flex items-start gap-1.5 text-white/60 text-sm mb-4">
          <MapPin size={13} className="mt-0.5 flex-shrink-0" />
          <span>{order.deliveryAddress}</span>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
        <Clock size={13} />
        <span>{order.deliveryTime === 'asap' ? 'So schnell wie möglich (~45–60 Min.)' : `Wunschzeit: ${order.deliveryTime}`}</span>
      </div>

      <div className="bg-white/5 rounded-xl p-3 mb-4">
        <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Bestellung</div>
        {order.items?.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
            <span className="text-white">
              <span className="text-[#d4af37] font-bold mr-2">{item.quantity}×</span>
              {item.dishName}
            </span>
            <span className="text-white/60">{(item.price * item.quantity).toFixed(2)} €</span>
          </div>
        ))}
      </div>

      {order.notes && (
        <div className="bg-white/5 rounded-xl p-3 mb-4 text-sm text-white/60">
          <span className="text-white/40 font-semibold">Anmerkung: </span>{order.notes}
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
          order.paymentMethod === 'card' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
        }`}>
          {order.paymentMethod === 'card' ? '💳 Karte' : '💵 Bar'}
        </span>
      </div>

      <div className="flex gap-3">
        {variant === 'new' && (
          <button onClick={onAccept} disabled={isUpdating}
            className="flex-1 bg-[#d4af37] text-[#1a3a32] font-bold py-3 rounded-xl text-sm hover:bg-[#e8c84a] transition-all disabled:opacity-50">
            ✓ Bestellung annehmen
          </button>
        )}
        <button onClick={onDone} disabled={isUpdating}
          className={`font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 ${
            variant === 'new' ? 'px-4 bg-white/10 text-white hover:bg-white/20' : 'flex-1 bg-green-600 text-white hover:bg-green-500'
          }`}>
          {variant === 'in_progress' ? '✓ Erledigt' : 'Erledigt'}
        </button>
      </div>
    </div>
  );
}

// ─── Protected Export ─────────────────────────────────────────────────────────

export default function LiveOrders() {
  return (
    <PinProtect>
      <LiveOrdersDashboard />
    </PinProtect>
  );
}
