import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuSection from '@/components/MenuSection';
import OrdersClosedModal from '@/components/OrdersClosedModal';
// menuData wird nicht mehr benötigt - Warenkorb enthält alle nötigen Daten
import { trpc } from '@/lib/trpc';
import {
  ShoppingCart, Truck, CreditCard, CheckCircle, Clock, Calendar,
  ChevronRight, ChevronLeft, Minus, Plus, X, AlertCircle
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const DELIVERY_FEE = 3.50;
const MIN_ORDER = 12.00;

const TIME_SLOTS = [
  '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
];

function StepIndicator({ current }: { current: number }) {
  const { t } = useLang();
  const steps = [t.order_step1, t.order_step2, t.order_step3];
  const icons = [ShoppingCart, Truck, CreditCard];

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, idx) => {
        const Icon = icons[idx];
        const isActive = idx + 1 === current;
        const isDone = idx + 1 < current;
        return (
          <div key={step} className="flex items-center">
            <div className={`flex flex-col items-center ${idx < steps.length - 1 ? 'mr-0' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'bg-[#1a3a32] text-white shadow-lg' :
                isDone ? 'bg-[#d4af37] text-white' :
                'bg-gray-100 text-gray-400'
              }`}>
                <Icon size={16} />
              </div>
              <span className={`text-xs mt-1 font-medium hidden sm:block ${isActive ? 'text-[#1a3a32]' : isDone ? 'text-[#d4af37]' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 w-12 sm:w-20 mx-2 transition-all ${isDone ? 'bg-[#d4af37]' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Step 1: Cart view
function Step1({ onNext }: { onNext: () => void }) {
  const { t, lang } = useLang();
  const { items, addItem, removeItem, updateQuantity, total } = useCart();
  const belowMin = total < MIN_ORDER;

  return (
    <div>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
          <p className={`text-[#1a3a32]/50 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.order_cart_empty}</p>
          <p className="text-[#1a3a32]/40 text-sm mt-2">Bitte wählen Sie Gerichte aus der Speisekarte unten.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {items.map(item => {
            // Namen aus Warenkorb-Daten holen (enthält DE/EN/AM)
            const displayName = lang === 'en' ? (item.nameEn || item.name) : lang === 'am' ? (item.nameAm || item.name) : item.name;
            return (
              <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#1a3a32]/8">
                <div className="flex-1">
                  <p className={`text-sm font-semibold text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>{displayName}</p>
                  <p className="text-[#d4af37] text-xs font-bold">{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-full border border-[#1a3a32]/20 flex items-center justify-center hover:bg-[#1a3a32] hover:text-white transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="text-[#1a3a32] font-bold text-sm w-5 text-center">{item.quantity}</span>
                  <button onClick={() => {
                    // Daten direkt aus Warenkorb-Item
                    addItem({ id: item.id, name: item.name, nameEn: item.nameEn, nameAm: item.nameAm, price: item.price });
                  }} className="w-7 h-7 rounded-full bg-[#1a3a32] text-white flex items-center justify-center hover:bg-[#1a3a32]/80 transition-colors">
                    <Plus size={12} />
                  </button>
                  <button onClick={() => updateQuantity(item.id, 0)} className="w-7 h-7 rounded-full text-gray-400 hover:text-red-500 transition-colors ml-1">
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {items.length > 0 && (
        <div className="bg-[#f5f0e8] rounded-xl p-5 space-y-2 mb-6">
          <div className="flex justify-between text-sm text-[#1a3a32]/70">
            <span className={lang === 'am' ? 'font-ethiopic' : ''}>{t.order_subtotal}</span>
            <span>{total.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="flex justify-between text-sm text-[#1a3a32]/70">
            <span className={lang === 'am' ? 'font-ethiopic' : ''}>{t.order_delivery_fee}</span>
            <span>{DELIVERY_FEE.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="border-t border-[#1a3a32]/10 pt-2 flex justify-between font-bold text-[#1a3a32]">
            <span className={lang === 'am' ? 'font-ethiopic' : ''}>{t.order_total}</span>
            <span>{(total + DELIVERY_FEE).toFixed(2).replace('.', ',')} €</span>
          </div>
        </div>
      )}

      {belowMin && items.length > 0 && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
          <AlertCircle size={16} className="text-amber-500" />
          <p className="text-amber-700 text-sm">
            {t.order_min_order}: {MIN_ORDER.toFixed(2).replace('.', ',')} €
            (noch {(MIN_ORDER - total).toFixed(2).replace('.', ',')} € fehlen)
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={items.length === 0 || belowMin}
        className="w-full btn-premium py-4 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {t.order_next} <ChevronRight size={16} />
      </button>
    </div>
  );
}

// Step 2: Delivery details
function Step2({ onNext, onBack, deliveryData, setDeliveryData }: {
  onNext: () => void;
  onBack: () => void;
  deliveryData: any;
  setDeliveryData: (d: any) => void;
}) {
  const { t, lang } = useLang();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!deliveryData.firstname) e.firstname = 'Pflichtfeld';
    if (!deliveryData.lastname) e.lastname = 'Pflichtfeld';
    if (!deliveryData.phone) e.phone = 'Pflichtfeld';
    if (!deliveryData.email) e.email = 'Pflichtfeld';
    else if (!/\S+@\S+\.\S+/.test(deliveryData.email)) e.email = 'Ungültige E-Mail-Adresse';
    if (!deliveryData.street) e.street = 'Pflichtfeld';
    if (!deliveryData.city) e.city = 'Pflichtfeld';
    if (deliveryData.deliveryType === 'schedule') {
      if (!deliveryData.scheduleDate) e.scheduleDate = 'Pflichtfeld';
      else {
        const d = new Date(deliveryData.scheduleDate);
        const tod = new Date(); tod.setHours(0,0,0,0);
        if (d < tod) e.scheduleDate = t.order_past_error;
        if (d.getDay() === 0) e.scheduleDate = t.order_sunday_error;
      }
      if (!deliveryData.scheduleTime) e.scheduleTime = 'Pflichtfeld';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const inp = (field: string, placeholder: string, type = 'text', label: string) => (
    <div>
      <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
        {label} *
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={deliveryData[field] || ''}
        onChange={e => setDeliveryData({ ...deliveryData, [field]: e.target.value })}
        required
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all ${errors[field] ? 'border-red-400' : 'border-gray-200'}`}
      />
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {inp('firstname', 'Max', 'text', t.order_firstname)}
        {inp('lastname', 'Mustermann', 'text', t.order_lastname)}
      </div>
      {inp('phone', '+43 ...', 'tel', t.res_phone)}
      {inp('email', 'max@beispiel.at', 'email', t.res_email)}
      {inp('street', 'Hauptstraße 1', 'text', t.order_street)}
      {inp('city', 'Salzburg', 'text', t.order_city)}
      {/* PLZ wird intern auf 5020 validiert, aber nicht separat angezeigt */}
      <input type="hidden" value={deliveryData.zip || ''} />
      <div>
        <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
          {t.order_floor}
        </label>
        <input
          type="text"
          placeholder="z.B. 2. OG / Tür 5"
          value={deliveryData.floor || ''}
          onChange={e => setDeliveryData({ ...deliveryData, floor: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
        />
      </div>

      {/* Delivery time */}
      <div>
        <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
          Lieferzeit *
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { key: 'asap', icon: Clock, title: t.order_asap, sub: t.order_asap_desc },
            { key: 'schedule', icon: Calendar, title: t.order_schedule, sub: t.order_schedule_desc },
          ].map(({ key, icon: Icon, title, sub }) => (
            <button
              key={key}
              type="button"
              onClick={() => setDeliveryData({ ...deliveryData, deliveryType: key })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                deliveryData.deliveryType === key
                  ? 'border-[#1a3a32] bg-[#1a3a32]/5'
                  : 'border-gray-200 hover:border-[#d4af37]/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={deliveryData.deliveryType === key ? 'text-[#1a3a32]' : 'text-gray-400'} />
                <span className={`text-sm font-semibold ${deliveryData.deliveryType === key ? 'text-[#1a3a32]' : 'text-gray-600'} ${lang === 'am' ? 'font-ethiopic' : ''}`}>{title}</span>
              </div>
              <p className={`text-xs ${deliveryData.deliveryType === key ? 'text-[#1a3a32]/60' : 'text-gray-400'} ${lang === 'am' ? 'font-ethiopic' : ''}`}>{sub}</p>
            </button>
          ))}
        </div>

        {deliveryData.deliveryType === 'schedule' && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2">Datum *</label>
              <input
                type="date"
                min={today}
                value={deliveryData.scheduleDate || ''}
                onChange={e => setDeliveryData({ ...deliveryData, scheduleDate: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all ${errors.scheduleDate ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.scheduleDate && <p className="text-red-500 text-xs mt-1">{errors.scheduleDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2">Uhrzeit *</label>
              <select
                value={deliveryData.scheduleTime || ''}
                onChange={e => setDeliveryData({ ...deliveryData, scheduleTime: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all bg-white ${errors.scheduleTime ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">Wählen...</option>
                {TIME_SLOTS.map(s => <option key={s} value={s}>{s} Uhr</option>)}
              </select>
              {errors.scheduleTime && <p className="text-red-500 text-xs mt-1">{errors.scheduleTime}</p>}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className={`block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
          {t.order_delivery_note}
        </label>
        <textarea
          placeholder="z.B. Klingel defekt, bitte anrufen"
          value={deliveryData.note || ''}
          onChange={e => setDeliveryData({ ...deliveryData, note: e.target.value })}
          rows={2}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1a3a32] text-[#1a3a32] text-sm font-bold hover:bg-[#1a3a32] hover:text-white transition-all">
          <ChevronLeft size={16} /> {t.order_back}
        </button>
        <button onClick={handleNext} className="flex-1 btn-premium py-3 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
          {t.order_next} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// Step 3: Payment
// Wrapper-Komponente: lädt PaymentIntent und gibt clientSecret an Elements weiter
function PaymentStep({ onBack, deliveryData, onSuccess }: { onBack: () => void; deliveryData: any; onSuccess: (orderNum: string) => void }) {
  const { items, total } = useCart();
  const grandTotal = total + DELIVERY_FEE;
  const [payMethod, setPayMethod] = useState<'card' | 'cash'>('card');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);
  const { t, lang } = useLang();
  const createPaymentIntent = trpc.orders.createPaymentIntent.useMutation();

  const customerName = `${deliveryData.firstname || ''} ${deliveryData.lastname || ''}`.trim() || 'Gast';
  const customerEmail = deliveryData.email || 'keine@email.at';

  // PaymentIntent laden wenn Kartenzahlung gewählt
  const loadPaymentIntent = async () => {
    if (clientSecret) return; // bereits geladen
    setIntentLoading(true);
    try {
      const result = await createPaymentIntent.mutateAsync({
        amount: grandTotal,
        customerName,
        customerEmail,
      });
      setClientSecret(result.clientSecret || null);
      setPaymentIntentId(result.paymentIntentId);
    } catch (err) {
      console.error('PaymentIntent Fehler:', err);
    } finally {
      setIntentLoading(false);
    }
  };

  const handlePayMethodChange = (method: 'card' | 'cash') => {
    setPayMethod(method);
    if (method === 'card' && !clientSecret) {
      loadPaymentIntent();
    }
  };

  // PaymentIntent beim ersten Render laden (Karte ist Standard)
  const [initialized, setInitialized] = useState(false);
  if (!initialized) {
    setInitialized(true);
    loadPaymentIntent();
  }

  // Kartenzahlung: CardPaymentInner MUSS innerhalb <Elements> sein
  if (payMethod === 'card') {
    if (intentLoading || !clientSecret) {
      return (
        <div className="border border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center gap-3 text-[#1a3a32]/50">
          <span className="w-8 h-8 border-2 border-[#1a3a32]/20 border-t-[#1a3a32] rounded-full animate-spin" />
          <span className="text-sm">Zahlungsoptionen werden geladen...</span>
          <button type="button" onClick={onBack} className="mt-4 text-xs text-[#1a3a32]/60 underline">Zurück</button>
        </div>
      );
    }
    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#1a3a32',
              colorBackground: '#ffffff',
              colorText: '#1a3a32',
              colorDanger: '#df1b41',
              fontFamily: 'system-ui, sans-serif',
              borderRadius: '8px',
            },
          },
        }}
      >
        <CardPaymentInner
          onBack={onBack}
          deliveryData={deliveryData}
          onSuccess={onSuccess}
          onPayMethodChange={handlePayMethodChange}
          paymentIntentId={paymentIntentId}
          grandTotal={grandTotal}
        />
      </Elements>
    );
  }

  // Barzahlung: kein Stripe nötig
  return (
    <PaymentFormShell
      onBack={onBack}
      deliveryData={deliveryData}
      onSuccess={onSuccess}
      payMethod={payMethod}
      onPayMethodChange={handlePayMethodChange}
      grandTotal={grandTotal}
    >
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-700 text-sm">Bitte zahlen Sie bei der Lieferung in bar. Bitte halten Sie den genauen Betrag bereit.</p>
      </div>
    </PaymentFormShell>
  );
}

// Gemeinsame Formular-Shell (ohne Stripe-Hooks – sicher außerhalb Elements)
function PaymentFormShell({
  onBack, deliveryData, onSuccess, payMethod, onPayMethodChange, grandTotal, loadingIntent, children
}: {
  onBack: () => void;
  deliveryData: any;
  onSuccess: (orderNum: string) => void;
  payMethod: 'card' | 'cash';
  onPayMethodChange: (m: 'card' | 'cash') => void;
  grandTotal: number;
  loadingIntent?: boolean;
  children?: React.ReactNode;
}) {
  const { t, lang } = useLang();
  const { items, total, clearCart } = useCart();
  const [agb, setAgb] = useState(false);
  const [agbError, setAgbError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const createOrder = trpc.orders.create.useMutation();

  const customerName = `${deliveryData.firstname || ''} ${deliveryData.lastname || ''}`.trim() || 'Gast';
  const customerEmail = deliveryData.email || 'keine@email.at';

  const handleCashSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agb) { setAgbError('Bitte akzeptieren Sie die AGB.'); return; }
    setLoading(true);
    setSubmitError('');
    const deliveryAddress = deliveryData.street
      ? `${deliveryData.street}, ${deliveryData.zip || ''} ${deliveryData.city || ''}`.trim()
      : undefined;
    const deliveryTime = deliveryData.deliveryType === 'asap'
      ? 'So schnell wie möglich (~45–60 Min.)'
      : `${deliveryData.scheduleDate || ''} um ${deliveryData.scheduleTime || ''} Uhr`;
    const orderItems = items.map(item => ({ dishName: item.name, quantity: item.quantity, price: item.price }));
    try {
      const { orderNum } = await createOrder.mutateAsync({
        customerName, phone: deliveryData.phone || '–', email: customerEmail,
        items: orderItems, totalPrice: grandTotal, orderType: 'delivery',
        deliveryAddress, deliveryTime, paymentMethod: 'cash', notes: deliveryData.notes || undefined,
      });
      clearCart();
      onSuccess(`#${orderNum}`);
    } catch (err) {
      setSubmitError('Bestellung konnte nicht gespeichert werden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={payMethod === 'cash' ? handleCashSubmit : (e) => e.preventDefault()} className="space-y-6">
      {/* Order summary */}
      <div className="bg-[#f5f0e8] rounded-xl p-5">
        <h3 className="font-semibold text-[#1a3a32] text-sm mb-3">Bestellübersicht</h3>
        <div className="space-y-1 mb-3">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-xs text-[#1a3a32]/70">
              <span>{item.quantity}× {item.name}</span>
              <span>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1a3a32]/10 pt-2 space-y-1">
          <div className="flex justify-between text-xs text-[#1a3a32]/60">
            <span>{t.order_subtotal}</span><span>{total.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="flex justify-between text-xs text-[#1a3a32]/60">
            <span>{t.order_delivery_fee}</span><span>{DELIVERY_FEE.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="flex justify-between font-bold text-[#1a3a32] text-base pt-1">
            <span>{t.order_total}</span><span>{grandTotal.toFixed(2).replace('.', ',')} €</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#1a3a32]/10 text-xs text-[#1a3a32]/60">
          <p>📍 {deliveryData.street}, {deliveryData.zip} {deliveryData.city}</p>
          <p>🕐 {deliveryData.deliveryType === 'asap' ? t.order_asap_desc : `${deliveryData.scheduleDate} um ${deliveryData.scheduleTime} Uhr`}</p>
        </div>
      </div>
      {/* Payment method selector */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-3">Zahlungsmethode</label>
        <div className="space-y-2">
          {[
            { key: 'card' as const, label: t.order_pay_card, icon: '💳' },
            { key: 'cash' as const, label: t.order_pay_cash, icon: '💵' },
          ].map(({ key, label, icon }) => (
            <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === key ? 'border-[#1a3a32] bg-[#1a3a32]/5' : 'border-gray-200'}`}>
              <input type="radio" name="pay" value={key} checked={payMethod === key} onChange={() => onPayMethodChange(key)} className="accent-[#1a3a32]" />
              <span className="text-lg">{icon}</span>
              <span className={`text-sm font-medium text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>{label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Slot für Stripe Payment Element oder Barzahlungshinweis */}
      {children}
      {/* AGB */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agb} onChange={e => { setAgb(e.target.checked); setAgbError(''); }} className="mt-0.5 w-4 h-4 accent-[#1a3a32]" />
          <span className={`text-sm text-[#1a3a32]/70 leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.order_agb_text}</span>
        </label>
        {agbError && <p className="text-red-500 text-xs mt-1">{agbError}</p>}
      </div>
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1a3a32] text-[#1a3a32] text-sm font-bold hover:bg-[#1a3a32] hover:text-white transition-all">
          <ChevronLeft size={16} /> {t.order_back}
        </button>
        <button type="submit" disabled={loading || (payMethod === 'card' && !!loadingIntent)} className="flex-1 btn-premium py-3 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
          {t.order_submit}
        </button>
      </div>
    </form>
  );
}

// CardPaymentInner – nur innerhalb <Elements> aufgerufen, daher useStripe/useElements sicher
function CardPaymentInner({
  onBack, deliveryData, onSuccess, onPayMethodChange, paymentIntentId, grandTotal
}: {
  onBack: () => void;
  deliveryData: any;
  onSuccess: (orderNum: string) => void;
  onPayMethodChange: (m: 'card' | 'cash') => void;
  paymentIntentId: string | null;
  grandTotal: number;
}) {
  const { t, lang } = useLang();
  const { items, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [agb, setAgb] = useState(false);
  const [agbError, setAgbError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const createOrder = trpc.orders.create.useMutation();

  const customerName = `${deliveryData.firstname || ''} ${deliveryData.lastname || ''}`.trim() || 'Gast';
  const customerEmail = deliveryData.email || 'keine@email.at';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agb) { setAgbError('Bitte akzeptieren Sie die AGB.'); return; }
    if (!stripe || !elements) { return; }
    setLoading(true);
    setSubmitError('');
    const deliveryAddress = deliveryData.street
      ? `${deliveryData.street}, ${deliveryData.zip || ''} ${deliveryData.city || ''}`.trim()
      : undefined;
    const deliveryTime = deliveryData.deliveryType === 'asap'
      ? 'So schnell wie möglich (~45–60 Min.)'
      : `${deliveryData.scheduleDate || ''} um ${deliveryData.scheduleTime || ''} Uhr`;
    const orderItems = items.map(item => ({ dishName: item.name, quantity: item.quantity, price: item.price }));
    try {
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: { payment_method_data: { billing_details: { name: customerName, email: customerEmail } } },
        redirect: 'if_required',
      });
      if (stripeError) {
        setSubmitError(stripeError.message || 'Zahlung fehlgeschlagen.');
        setLoading(false);
        return;
      }
      const { orderNum } = await createOrder.mutateAsync({
        customerName, phone: deliveryData.phone || '–', email: customerEmail,
        items: orderItems, totalPrice: grandTotal, orderType: 'delivery',
        deliveryAddress, deliveryTime, paymentMethod: 'card',
        notes: deliveryData.notes || undefined, stripePaymentIntentId: paymentIntentId || undefined,
      });
      clearCart();
      onSuccess(`#${orderNum}`);
    } catch (err) {
      setSubmitError('Bestellung konnte nicht gespeichert werden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order summary – compact */}
      <div className="bg-[#f5f0e8] rounded-xl p-4 text-xs text-[#1a3a32]/70">
        <div className="flex justify-between font-bold text-[#1a3a32] text-sm mb-1">
          <span>Gesamt</span><span>{grandTotal.toFixed(2).replace('.', ',')} €</span>
        </div>
        <p>📍 {deliveryData.street}, {deliveryData.zip} {deliveryData.city}</p>
      </div>
      {/* Payment method selector */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-3">Zahlungsmethode</label>
        <div className="space-y-2">
          {[
            { key: 'card' as const, label: t.order_pay_card, icon: '💳' },
            { key: 'cash' as const, label: t.order_pay_cash, icon: '💵' },
          ].map(({ key, label, icon }) => (
            <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${key === 'card' ? 'border-[#1a3a32] bg-[#1a3a32]/5' : 'border-gray-200'}`}>
              <input type="radio" name="pay" value={key} checked={key === 'card'} onChange={() => onPayMethodChange(key)} className="accent-[#1a3a32]" />
              <span className="text-lg">{icon}</span>
              <span className={`text-sm font-medium text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>{label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Stripe Payment Element */}
      <div className="border border-gray-200 rounded-xl p-4">
        <PaymentElement options={{ layout: 'tabs', wallets: { googlePay: 'auto', applePay: 'auto' } }} />
      </div>
      <p className={`text-xs text-[#1a3a32]/50 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.order_pay_secure}</p>
      {/* AGB */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agb} onChange={e => { setAgb(e.target.checked); setAgbError(''); }} className="mt-0.5 w-4 h-4 accent-[#1a3a32]" />
          <span className={`text-sm text-[#1a3a32]/70 leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.order_agb_text}</span>
        </label>
        {agbError && <p className="text-red-500 text-xs mt-1">{agbError}</p>}
      </div>
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}
      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1a3a32] text-[#1a3a32] text-sm font-bold hover:bg-[#1a3a32] hover:text-white transition-all">
          <ChevronLeft size={16} /> {t.order_back}
        </button>
        <button type="submit" disabled={loading} className="flex-1 btn-premium py-3 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
          {t.order_submit}
        </button>
      </div>
    </form>
  );
}

// Dummy PaymentForm – wird nicht mehr direkt verwendet, aber Typ-Kompatibilität sicherstellen
function PaymentForm({
  onBack, deliveryData, onSuccess, payMethod, onPayMethodChange, paymentIntentId, grandTotal, loadingIntent
}: {
  onBack: () => void;
  deliveryData: any;
  onSuccess: (orderNum: string) => void;
  payMethod: 'card' | 'cash';
  onPayMethodChange: (m: 'card' | 'cash') => void;
  paymentIntentId: string | null;
  grandTotal: number;
  loadingIntent?: boolean;
}) {
  const { t, lang } = useLang();
  const { items, total, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [agb, setAgb] = useState(false);
  const [agbError, setAgbError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAgb, setShowAgb] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const createOrder = trpc.orders.create.useMutation();

  const customerName = `${deliveryData.firstname || ''} ${deliveryData.lastname || ''}`.trim() || 'Gast';
  const customerEmail = deliveryData.email || 'keine@email.at';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agb) { setAgbError('Bitte akzeptieren Sie die AGB.'); return; }
    setLoading(true);
    setSubmitError('');

    const deliveryAddress = deliveryData.street
      ? `${deliveryData.street}, ${deliveryData.zip || ''} ${deliveryData.city || ''}`.trim()
      : undefined;
    const deliveryTime = deliveryData.deliveryType === 'asap'
      ? 'So schnell wie möglich (~45–60 Min.)'
      : `${deliveryData.scheduleDate || ''} um ${deliveryData.scheduleTime || ''} Uhr`;
    const orderItems = items.map(item => ({
      dishName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      let stripePaymentIntentId: string | undefined;

      if (payMethod === 'card') {
        if (!stripe || !elements) {
          setSubmitError('Stripe ist nicht geladen. Bitte Seite neu laden.');
          setLoading(false);
          return;
        }

        // Payment Element bestätigen
        const { error: stripeError } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            payment_method_data: {
              billing_details: { name: customerName, email: customerEmail },
            },
          },
          redirect: 'if_required',
        });

        if (stripeError) {
          setSubmitError(stripeError.message || 'Zahlung fehlgeschlagen. Bitte versuche es erneut.');
          setLoading(false);
          return;
        }

        stripePaymentIntentId = paymentIntentId || undefined;
      }

      // Bestellung in Sanity speichern
      const { orderNum } = await createOrder.mutateAsync({
        customerName,
        phone: deliveryData.phone || '–',
        email: customerEmail,
        items: orderItems,
        totalPrice: grandTotal,
        orderType: 'delivery',
        deliveryAddress,
        deliveryTime,
        paymentMethod: payMethod,
        notes: deliveryData.notes || undefined,
        stripePaymentIntentId,
      });

      clearCart();
      onSuccess(`#${orderNum}`);
    } catch (err) {
      console.error('Bestellfehler:', err);
      setSubmitError('Bestellung konnte nicht gespeichert werden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order summary */}
      <div className="bg-[#f5f0e8] rounded-xl p-5">
        <h3 className="font-semibold text-[#1a3a32] text-sm mb-3">Bestellübersicht</h3>
        <div className="space-y-1 mb-3">
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-xs text-[#1a3a32]/70">
              <span>{item.quantity}× {item.name}</span>
              <span>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1a3a32]/10 pt-2 space-y-1">
          <div className="flex justify-between text-xs text-[#1a3a32]/60">
            <span>{t.order_subtotal}</span><span>{total.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="flex justify-between text-xs text-[#1a3a32]/60">
            <span>{t.order_delivery_fee}</span><span>{DELIVERY_FEE.toFixed(2).replace('.', ',')} €</span>
          </div>
          <div className="flex justify-between font-bold text-[#1a3a32] text-base pt-1">
            <span>{t.order_total}</span><span>{grandTotal.toFixed(2).replace('.', ',')} €</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-[#1a3a32]/10 text-xs text-[#1a3a32]/60">
          <p>📍 {deliveryData.street}, {deliveryData.zip} {deliveryData.city}</p>
          <p>🕐 {deliveryData.deliveryType === 'asap' ? t.order_asap_desc : `${deliveryData.scheduleDate} um ${deliveryData.scheduleTime} Uhr`}</p>
        </div>
      </div>

      {/* Payment method selector */}
      <div>
        <label className="block text-xs font-semibold text-[#1a3a32] tracking-widest uppercase mb-3">Zahlungsmethode</label>
        <div className="space-y-2">
          {[
            { key: 'card' as const, label: t.order_pay_card, icon: '💳' },
            { key: 'cash' as const, label: t.order_pay_cash, icon: '💵' },
          ].map(({ key, label, icon }) => (
            <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === key ? 'border-[#1a3a32] bg-[#1a3a32]/5' : 'border-gray-200'}`}>
              <input type="radio" name="pay" value={key} checked={payMethod === key} onChange={() => onPayMethodChange(key)} className="accent-[#1a3a32]" />
              <span className="text-lg">{icon}</span>
              <span className={`text-sm font-medium text-[#1a3a32] ${lang === 'am' ? 'font-ethiopic' : ''}`}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stripe Payment Element (Karte, Google Pay, Apple Pay) */}
      {payMethod === 'card' && (
        <div>
          {loadingIntent ? (
            <div className="border border-gray-200 rounded-xl p-6 flex items-center justify-center gap-2 text-[#1a3a32]/50">
              <span className="w-4 h-4 border-2 border-[#1a3a32]/20 border-t-[#1a3a32] rounded-full animate-spin" />
              <span className="text-sm">Zahlungsoptionen werden geladen...</span>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl p-4">
              <PaymentElement
                options={{
                  layout: 'tabs',
                  wallets: { googlePay: 'auto', applePay: 'auto' },
                }}
              />
            </div>
          )}
          <p className={`text-xs text-[#1a3a32]/50 mt-2 ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.order_pay_secure}</p>
        </div>
      )}

      {payMethod === 'cash' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className={`text-amber-700 text-sm ${lang === 'am' ? 'font-ethiopic' : ''}`}>{t.order_pay_cash_note}</p>
        </div>
      )}

      {/* AGB */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agb} onChange={e => { setAgb(e.target.checked); setAgbError(''); }} className="mt-0.5 w-4 h-4 accent-[#1a3a32]" />
          <span className={`text-sm text-[#1a3a32]/70 leading-relaxed ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.order_agb_text}
          </span>
        </label>
        {agbError && <p className="text-red-500 text-xs mt-1">{agbError}</p>}
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1a3a32] text-[#1a3a32] text-sm font-bold hover:bg-[#1a3a32] hover:text-white transition-all">
          <ChevronLeft size={16} /> {t.order_back}
        </button>
        <button type="submit" disabled={loading || (payMethod === 'card' && !!loadingIntent)} className="flex-1 btn-premium py-3 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
          {t.order_submit}
        </button>
      </div>
    </form>
  );
}

export default function OrderPage() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState({ deliveryType: 'asap' });
  const [orderNum, setOrderNum] = useState('');

  const { data: orderSettingsData } = trpc.orderSettings.getEnabled.useQuery();
  const ordersEnabled = orderSettingsData?.enabled ?? true;

  // If orders are disabled, show a full-page block
  if (orderSettingsData !== undefined && !ordersEnabled) {
    return (
      <div className="min-h-screen bg-[#fdfbf7]">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-40 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="font-serif text-3xl font-bold text-[#1a3a32] mb-4">Bestellungen pausiert</h1>
          <p className="text-[#1a3a32]/65 text-base leading-relaxed mb-8">
            Wir nehmen gerade keine Online-Bestellungen an.<br />
            Bitte rufen Sie uns an oder versuchen Sie es später erneut.
          </p>
          <a
            href="tel:+436607324766"
            className="inline-flex items-center gap-2 bg-[#1a3a32] text-white font-bold py-3.5 px-8 rounded-2xl hover:bg-[#1a3a32]/90 transition-colors text-sm"
          >
            +43 660 732 47 66
          </a>
          <div className="mt-6">
            <a href="/" className="text-[#1a3a32]/50 text-sm hover:text-[#1a3a32] transition-colors">← Zurück zur Startseite</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderNum) {
    return (
      <div className="min-h-screen bg-[#fdfbf7]">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-32 text-center">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className={`font-serif text-3xl font-bold text-[#1a3a32] mb-3 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {t.order_success_title}
          </h1>
          <p className={`text-[#1a3a32]/65 text-sm leading-relaxed mb-8 ${lang === 'am' ? 'font-ethiopic' : ''}`}>
            {lang === 'am'
              ? 'ምግቡን ከተመገቡ በኋላ አስተያየትዎን ቢያካፍሉን ደስ ይለናል – በኢሜይል፣ ዋትሳፕ ወይም ሪቪው በኩል።'
              : lang === 'en'
              ? 'We would love to hear your feedback after your meal – by email, WhatsApp, or leave us a review.'
              : 'Wir würden uns freuen, nach dem Essen Ihr Feedback zu erhalten – per E-Mail, WhatsApp oder als Bewertung.'}
          </p>

          {/* Review Links */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <a
              href="https://www.google.com/search?q=HABESHA+%C3%84THIOPISCHE+RESTAURANT+Salzburg&ludocid=&hl=de#lrd=0x477696c5c5c5c5c5:0x1,1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#1a3a32] text-[#1a3a32] text-sm font-semibold hover:bg-[#1a3a32] hover:text-white transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </a>
            <a
              href="https://www.tripadvisor.com/Restaurant_Review-g190441-d28646928-Reviews-Habesha-Salzburg_State_of_Salzburg.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#34e0a1] text-[#00aa6c] text-sm font-semibold hover:bg-[#00aa6c] hover:text-white transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              TripAdvisor
            </a>
          </div>

          <a href="/" className="btn-premium px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase inline-block">
            {t.order_back_home}
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#1a3a32] pt-32 pb-12 text-center">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#078930]" />
          <div className="flex-1 bg-[#FCDD09]" />
          <div className="flex-1 bg-[#DA121A]" />
        </div>
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-12 bg-[#d4af37]" />
          <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-medium">Online Bestellung</span>
          <div className="h-px w-12 bg-[#d4af37]" />
        </div>
        <h1 className={`font-serif text-4xl md:text-5xl font-bold text-white ${lang === 'am' ? 'font-ethiopic' : ''}`}>
          {t.order_title}
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl shadow-lg border-l-4 border-[#d4af37] p-8">
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              deliveryData={deliveryData}
              setDeliveryData={setDeliveryData}
            />
          )}
          {step === 3 && (
            <PaymentStep
              onBack={() => setStep(2)}
              deliveryData={deliveryData}
              onSuccess={(num) => setOrderNum(num)}
            />
          )}
        </div>
      </div>

      {/* Menu below for step 1 */}
      {step === 1 && (
        <div className="mt-4">
          <div className="text-center py-6">
            <p className="text-[#1a3a32]/60 text-sm">↓ Gerichte aus der Speisekarte auswählen</p>
          </div>
          <MenuSection />
        </div>
      )}

      <Footer />
    </div>
  );
}
