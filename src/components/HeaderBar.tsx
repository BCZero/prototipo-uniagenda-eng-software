import { Bell } from 'lucide-react'
import type { NavigateFn } from '../types'

interface Props {
  title?: string
  subtitle?: string
  unreadCount?: number
  onNavigate: NavigateFn
  showBell?: boolean
}

export default function HeaderBar({
  title = 'Olá, João 👋',
  subtitle = 'Confira seus próximos compromissos acadêmicos.',
  unreadCount = 0,
  onNavigate,
  showBell = true,
}: Props) {
  return (
    <div
      className="px-5 pt-14 pb-6 flex items-start justify-between"
      style={{ background: 'linear-gradient(160deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}
    >
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-blue-100 text-xs mt-1 font-medium">{subtitle}</p>}
      </div>

      {showBell && (
        <button
          onClick={() => onNavigate('notificacoes')}
          className="relative p-2 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-all backdrop-blur border border-white/20 shrink-0 ml-3"
          aria-label={`Notificações: ${unreadCount} não lidas`}
        >
          <Bell className="w-5 h-5" strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-blue-700 shadow-sm px-1 font-mono">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
