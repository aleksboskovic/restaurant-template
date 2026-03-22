import { useOrderType, OrderType } from '@/contexts/OrderTypeContext';
import { Package, Truck } from 'lucide-react';

interface OrderTypeSwitchProps {
  size?: 'sm' | 'md';
  className?: string;
}

export default function OrderTypeSwitch({ size = 'md', className = '' }: OrderTypeSwitchProps) {
  const { orderType, setOrderType } = useOrderType();

  const isSmall = size === 'sm';

  const options: { key: OrderType; label: string; icon: React.ReactNode }[] = [
    {
      key: 'pickup',
      label: 'Abholung',
      icon: <Package size={isSmall ? 13 : 15} />,
    },
    {
      key: 'delivery',
      label: 'Zustellung',
      icon: <Truck size={isSmall ? 13 : 15} />,
    },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-full border-2 border-[#1a3a32]/20 bg-[#f5f0e8] p-0.5 gap-0.5 ${className}`}
      role="group"
      aria-label="Bestellart wählen"
    >
      {options.map(({ key, label, icon }) => {
        const active = orderType === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => setOrderType(key)}
            className={`flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200 ${
              isSmall ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-xs'
            } ${
              active
                ? 'bg-[#1a3a32] text-white shadow-sm'
                : 'text-[#1a3a32]/60 hover:text-[#1a3a32] hover:bg-[#1a3a32]/8'
            }`}
            aria-pressed={active}
          >
            {icon}
            <span className="tracking-wide uppercase">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
