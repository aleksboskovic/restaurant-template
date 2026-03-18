import { useEffect, useRef, useState } from 'react';
import { trpc } from '@/lib/trpc';
import PinProtect from '@/components/PinProtect';
import { CheckCircle, Clock, Package, Phone, Mail, MapPin, Utensils, RefreshCw, Volume2, VolumeX } from 'lucide-react';

type OrderStatus = 'new' | 'in_progress' | 'done';

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

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
  } catch {
    // Fallback: ignore if AudioContext not available
  }
}

function LiveOrdersDashboard() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastOrderCount, setLastOrderCount] = useState<number | null>(null);
  const [justUpdated, setJustUpdated] = useState<string | null>(null);
  const updateStatus = trpc.orders.updateStatus.useMutation();
  const utils = trpc.useUtils();

  const { data: orders = [], isLoading, refetch } = trpc.orders.getActive.useQuery(undefined, {
    refetchInterval: 10000, // Poll every 10 seconds
  });

  // Sound on new orders
  useEffect(() => {
    if (lastOrderCount === null) {
      setLastOrderCount(orders.length);
      return;
    }
    if (orders.length > lastOrderCount && soundEnabled) {
      playNotificationSound();
    }
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
      {/* Header */}
      <div className="bg-[#1a3a32] border-b border-[#d4af37]/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center">
              <Utensils size={20} className="text-[#1a3a32]" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white">HABESHA</h1>
              <p className="text-[#d4af37] text-xs tracking-widest uppercase">Live Bestellungen</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(s => !s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                soundEnabled
                  ? 'bg-[#d4af37] text-[#1a3a32]'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {soundEnabled ? 'Ton an' : 'Ton aus'}
            </button>
            {/* Refresh */}
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-all"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              Aktualisieren
            </button>
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#1a3a32]/50 border-b border-white/10 px-6 py-3">
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-white/70 text-sm">Neu:</span>
            <span className="text-white font-bold text-lg">{newOrders.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-white/70 text-sm">In Bearbeitung:</span>
            <span className="text-white font-bold text-lg">{inProgressOrders.length}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-white/40 text-xs">Aktualisiert alle 10 Sek.</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading && orders.length === 0 ? (
          <div className="text-center py-20">
            <RefreshCw size={40} className="animate-spin text-[#d4af37] mx-auto mb-4" />
            <p className="text-white/60">Bestellungen werden geladen...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#1a3a32] flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            <h2 className="font-serif text-2xl text-white mb-2">Alles erledigt!</h2>
            <p className="text-white/50">Keine offenen Bestellungen. Neue Bestellungen erscheinen automatisch.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* New Orders Column */}
            <div>
              <h2 className="text-red-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                Neue Bestellungen ({newOrders.length})
              </h2>
              <div className="space-y-4">
                {newOrders.map(order => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onAccept={() => handleStatusChange(order._id, 'in_progress')}
                    onDone={() => handleStatusChange(order._id, 'done')}
                    isUpdating={justUpdated === order._id}
                    variant="new"
                  />
                ))}
                {newOrders.length === 0 && (
                  <div className="text-center py-8 text-white/30 text-sm border border-white/10 rounded-2xl">
                    Keine neuen Bestellungen
                  </div>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div>
              <h2 className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                In Bearbeitung ({inProgressOrders.length})
              </h2>
              <div className="space-y-4">
                {inProgressOrders.map(order => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    onAccept={() => handleStatusChange(order._id, 'in_progress')}
                    onDone={() => handleStatusChange(order._id, 'done')}
                    isUpdating={justUpdated === order._id}
                    variant="in_progress"
                  />
                ))}
                {inProgressOrders.length === 0 && (
                  <div className="text-center py-8 text-white/30 text-sm border border-white/10 rounded-2xl">
                    Keine Bestellungen in Bearbeitung
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  onAccept,
  onDone,
  isUpdating,
  variant,
}: {
  order: Order;
  onAccept: () => void;
  onDone: () => void;
  isUpdating: boolean;
  variant: 'new' | 'in_progress';
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all ${
        isUpdating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      } ${
        variant === 'new'
          ? 'bg-red-950/30 border-red-500/40'
          : 'bg-yellow-950/20 border-yellow-500/30'
      }`}
    >
      {/* Header */}
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
          <div className="text-[#d4af37] font-bold text-xl">{order.totalPrice.toFixed(2)} €</div>
          <div className="text-white/40 text-xs flex items-center gap-1 justify-end">
            <Clock size={10} />
            {formatTime(order.createdAt)}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm">
        <a href={`tel:${order.phone}`} className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
          <Phone size={13} />
          {order.phone}
        </a>
        <span className="flex items-center gap-1.5 text-white/60">
          <Mail size={13} />
          {order.email}
        </span>
      </div>

      {/* Delivery address */}
      {order.orderType === 'delivery' && order.deliveryAddress && (
        <div className="flex items-start gap-1.5 text-white/60 text-sm mb-4">
          <MapPin size={13} className="mt-0.5 flex-shrink-0" />
          <span>{order.deliveryAddress}</span>
        </div>
      )}

      {/* Delivery time */}
      <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
        <Clock size={13} />
        <span>
          {order.deliveryTime === 'asap'
            ? 'So schnell wie möglich (~45–60 Min.)'
            : `Wunschzeit: ${order.deliveryTime}`}
        </span>
      </div>

      {/* Items */}
      <div className="bg-white/5 rounded-xl p-3 mb-4">
        <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Bestellung</div>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5 last:border-0">
            <span className="text-white">
              <span className="text-[#d4af37] font-bold mr-2">{item.quantity}×</span>
              {item.dishName}
            </span>
            <span className="text-white/60">{(item.price * item.quantity).toFixed(2)} €</span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-white/5 rounded-xl p-3 mb-4 text-sm text-white/60">
          <span className="text-white/40 font-semibold">Anmerkung: </span>
          {order.notes}
        </div>
      )}

      {/* Payment */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
          order.paymentMethod === 'card'
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-green-500/20 text-green-400'
        }`}>
          {order.paymentMethod === 'card' ? '💳 Karte' : '💵 Bar'}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {variant === 'new' && (
          <button
            onClick={onAccept}
            disabled={isUpdating}
            className="flex-1 bg-[#d4af37] text-[#1a3a32] font-bold py-3 rounded-xl text-sm hover:bg-[#e8c84a] transition-all disabled:opacity-50"
          >
            ✓ Bestellung annehmen
          </button>
        )}
        <button
          onClick={onDone}
          disabled={isUpdating}
          className={`font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 ${
            variant === 'new'
              ? 'px-4 bg-white/10 text-white hover:bg-white/20'
              : 'flex-1 bg-green-600 text-white hover:bg-green-500'
          }`}
        >
          {variant === 'in_progress' ? '✓ Erledigt' : 'Erledigt'}
        </button>
      </div>
    </div>
  );
}

// Geschützter Export: Dashboard nur nach PIN-Eingabe zugänglich
export default function LiveOrders() {
  return (
    <PinProtect>
      <LiveOrdersDashboard />
    </PinProtect>
  );
}
