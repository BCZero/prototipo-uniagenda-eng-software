import { Calendar, Clock, ChevronRight, CheckSquare, CalendarDays, Bell, AlertTriangle, ArrowRight } from 'lucide-react'
import type { NavigateFn, TarefaPessoal, NotificacaoItem } from '../types'
import { proximasAtividades, disciplinas } from '../data'
import BottomNav from '../components/BottomNav'
import TypeBadge from '../components/TypeBadge'

interface Props {
  onNavigate: NavigateFn
  tarefas: TarefaPessoal[]
  notificacoes: NotificacaoItem[]
}

export default function HomeScreen({ onNavigate, tarefas, notificacoes }: Props) {
  const pendentesCount = tarefas.filter((t) => !t.concluida).length
  const unreadNotifsCount = notificacoes.filter((n) => !n.lida).length

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-7"
        style={{ background: 'linear-gradient(160deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Olá, João 👋</h1>
            <p className="text-blue-100 text-sm mt-1">
              Confira seus próximos compromissos acadêmicos.
            </p>
          </div>

          <button
            onClick={() => onNavigate('notificacoes')}
            className="relative p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white transition-all backdrop-blur border border-white/20 shrink-0"
            aria-label={`Notificações: ${unreadNotifsCount} não lidas`}
          >
            <Bell className="w-5 h-5" strokeWidth={2} />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-900 font-extrabold text-[10px] min-w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-blue-700 shadow-sm px-1 font-mono">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-blue-300" strokeWidth={1.75} />
          <span className="text-blue-200 text-xs font-medium">Segunda-feira, 31 de agosto</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 space-y-5">
        {/* Deadline Attention Card (Card de Atenção) */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs bg-amber-200/70 px-2.5 py-0.5 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>⏰ Atenção</span>
            </div>
            <span className="text-[10px] font-extrabold text-amber-700 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">
              VENCE AMANHÃ
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            Prova 1 de Banco de Dados
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Quarta-feira (02/09) às 19:00 • Sala 204
          </p>

          <button
            onClick={() => onNavigate('avaliacao-detail', 1)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-950 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs transition-all active:scale-95"
          >
            Ver detalhes
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Minha semana (Sprint 2 Quick Access Card) */}
        <section className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">Minha semana</h2>
                <p className="text-xs text-slate-500">Resumo de compromissos</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('agenda')}
              className="flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              Ver agenda
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onNavigate('agenda')}
              className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl text-left hover:bg-blue-50/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-slate-800">
                  {proximasAtividades.length} atividades
                </span>
                <span className="text-[10px] text-slate-500">acadêmicas</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('tarefas')}
              className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl text-left hover:bg-emerald-50/50 transition-colors"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div>
                <span className="block text-xs font-bold text-slate-800">
                  {pendentesCount} tarefas
                </span>
                <span className="text-[10px] text-slate-500">pessoais</span>
              </div>
            </button>
          </div>
        </section>

        {/* Próximas atividades */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">Próximas atividades</h2>
            <button
              onClick={() => onNavigate('provas-trabalhos')}
              className="flex items-center gap-0.5 text-blue-600 text-xs font-semibold hover:text-blue-700 transition-colors"
            >
              Ver tudo
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {proximasAtividades.map((a) => (
              <div
                key={a.id}
                onClick={() => onNavigate('avaliacao-detail', a.id)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:border-blue-200 cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <TypeBadge tipo={a.tipo} />
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">
                      {a.data}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-2 leading-snug">
                  {a.tituloLista}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">{a.disciplina}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" strokeWidth={1.75} />
                    {a.horario}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Minhas disciplinas */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">Minhas disciplinas</h2>
            <button
              onClick={() => onNavigate('disciplinas')}
              className="flex items-center gap-0.5 text-blue-600 text-xs font-semibold hover:text-blue-700 transition-colors"
            >
              Ver todas
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {disciplinas.map((d) => (
              <button
                key={d.id}
                onClick={() => onNavigate('disciplina-detail', d.id)}
                className="w-full bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3.5 text-left hover:border-slate-200 active:scale-[0.99] transition-all"
              >
                <div
                  className={`w-1 self-stretch rounded-full ${d.bgAccent} shrink-0`}
                  style={{ minHeight: '36px' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{d.nome}</p>
                  <p className={`text-xs mt-0.5 ${d.textAccent} font-medium`}>
                    Próxima: {d.proximaAtividade}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  )
}


