import { ESTADO_LABELS, ESTADO_COLORS } from '../../utils/constants';

interface BadgeProps {
  estado: string;
  className?: string;
}

export function Badge({ estado, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ESTADO_COLORS[estado] || 'bg-gray-100 text-gray-800'} ${className}`}>
      {ESTADO_LABELS[estado] || estado}
    </span>
  );
}
