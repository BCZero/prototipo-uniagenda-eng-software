import { ChevronLeft, Clock, FileText, Calendar, CheckSquare, CheckCheck, ChevronRight } from 'lucide-react'
import type { NavigateFn, NotificacaoItem } from '../types'

interface Props {
  notificacoes: NotificacaoItem[]
  onNavigate: NavigateFn
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onBack?: () => void
}

export default function NotificacoesScreen({
  notificacoes,
  onNavigate,
  onMarkAsRead,
  onMarkAllAsRead,
  onBack,
}: Props) {
  const unreadCount = notificacoes.filter((n) => !n.lida).length

  const handleNotificationClick = (n: NotificacaoItem) => {
    onMarkAsRead(n.id)
    if (n.targetType === 'avaliacao' && n.targetId !== undefined) {
      onNavigate('avaliacao-detail', n.targetId)
    } else if (n.targetType === 'tarefa' && n.targetId !== undefined) {
      onNavigate('tarefa-detail', n.targetId)
    }
  }

  const getNotificationIcon = (tipo: NotificacaoItem['tipo']) => {
    switch (tipo) {
      case 'PRAZO_PROXIMO':
        return <Clock className="w-4 h-4 text-amber-600" />
      case 'TRABALHO':
        return <FileText className="w-4 h-4 text-blue-600" />
      case 'ALTERACAO_ACADEMICA':
        return <Calendar className="w-4 h-4 text-indigo-600" />
      case 'TAREFA':
        return <CheckSquare className="w-4 h-4 text-emerald-600" />
    }
  }

  const getNotificationBadge = (tipo: NotificacaoItem['tipo']) => {
    switch (tipo) {
      case 'PRAZO_PROXIMO':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">⏰ PRAZO PRÓXIMO</span>
      case 'TRABALHO':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">📄 TRABALHO</span>
      case 'ALTERACAO_ACADEMICA':
        return <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">📅 ALTERAÇÃO ACADÊMICA</span>
      case 'TAREFA':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">✅ TAREFA</span>
    }
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => (onBack ? onBack() : onNavigate('home'))}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
            Voltar
          </button>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Marcar lidas
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Notificações</h1>
            <p className="text-sm text-slate-500 mt-0.5">Seus avisos e alertas acadêmicos</p>
          </div>
          {unreadCount > 0 ? (
            <span className="bg-blue-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full font-mono">
              {unreadCount} novas
            </span>
          ) : (
            <span className="bg-slate-100 text-slate-500 font-medium text-xs px-2.5 py-1 rounded-full">
              Todas lidas
            </span>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12 space-y-3">
        {notificacoes.map((n) => (
          <div
            key={n.id}
            onClick={() => handleNotificationClick(n)}
            className={`rounded-2xl p-4 border transition-all cursor-pointer active:scale-[0.99] relative ${
              !n.lida
                ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-500/10'
                : 'bg-white/80 border-slate-100 shadow-xs opacity-85'
            }`}
          >
            {/* Unread indicator dot */}
            {!n.lida && (
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
            )}

            <div className="flex items-center gap-2 mb-2">
              {getNotificationBadge(n.tipo)}
              <span className="text-[11px] text-slate-400 font-medium ml-auto pr-3">{n.tempo}</span>
            </div>

            <p className={`text-sm mb-1 ${!n.lida ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
              {n.titulo}
            </p>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              "{n.mensagem}"
            </p>

            <div className="flex items-center justify-between text-xs text-blue-600 font-semibold pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                {getNotificationIcon(n.tipo)}
                Ver detalhes
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
