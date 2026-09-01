import { Home, Calendar, BookOpen, CheckSquare } from 'lucide-react'
import type { NavigateFn, Screen } from '../types'

interface Props {
  active: Screen
  onNavigate: NavigateFn
}

export default function BottomNav({ active, onNavigate }: Props) {
  const items: { id: Screen; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'disciplinas', label: 'Disciplinas', icon: BookOpen },
    { id: 'tarefas', label: 'Tarefas', icon: CheckSquare },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-200 flex z-50 shadow-lg">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${
              isActive ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600 font-normal'
            }`}
          >
            <Icon
              className="w-5 h-5"
              strokeWidth={isActive ? 2.5 : 1.75}
            />
            <span className="text-[11px] leading-none">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

