import { Plus, Check, Calendar, ChevronRight, CheckCircle2, Circle } from 'lucide-react'
import type { NavigateFn, TarefaPessoal } from '../types'
import BottomNav from '../components/BottomNav'

interface Props {
  onNavigate: NavigateFn
  tarefas: TarefaPessoal[]
  onToggleTask: (id: string) => void
}

export default function TarefasScreen({ onNavigate, tarefas, onToggleTask }: Props) {
  const pendentes = tarefas.filter((t) => !t.concluida)
  const concluidas = tarefas.filter((t) => t.concluida)

  return (
    <div className="min-h-full bg-slate-50 flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Minhas tarefas</h1>
          <p className="text-sm text-slate-500 mt-0.5">Acompanhe suas tarefas pessoais.</p>
        </div>

        <button
          onClick={() => onNavigate('nova-tarefa')}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nova tarefa
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 space-y-6">
        {/* Section Pendentes */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span>Pendentes</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                {pendentes.length} pendentes
              </span>
            </h2>
          </div>

          {pendentes.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-slate-700 font-semibold text-sm">Tudo em dia!</p>
              <p className="text-slate-400 text-xs mt-0.5">Nenhuma tarefa pendente no momento.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendentes.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3.5 hover:border-slate-200 transition-all group"
                >
                  {/* Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleTask(t.id)
                    }}
                    className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center shrink-0 transition-colors"
                    aria-label="Marcar como concluída"
                  >
                    <Circle className="w-4 h-4 text-transparent" />
                  </button>

                  {/* Info area - clickable for details */}
                  <div
                    onClick={() => onNavigate('tarefa-detail', t.id)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {t.titulo}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Prazo: {t.data.slice(0, 5)}
                      </span>
                      {t.horario && <span className="text-slate-400">• {t.horario}</span>}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('tarefa-detail', t.id)}
                    className="text-slate-300 group-hover:text-slate-500 p-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section Concluídas */}
        {concluidas.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <span>Concluídas</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
                  {concluidas.length} concluídas
                </span>
              </h2>
            </div>

            <div className="space-y-2.5">
              {concluidas.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/80 rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5 transition-all opacity-75 hover:opacity-100"
                >
                  {/* Checkbox completed */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleTask(t.id)
                    }}
                    className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-emerald-600 transition-colors"
                    aria-label="Reabrir tarefa"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  {/* Info area */}
                  <div
                    onClick={() => onNavigate('tarefa-detail', t.id)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-slate-500 line-through">
                      {t.titulo}
                    </p>
                    <span className="inline-block mt-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Concluída {t.concluidaEm ? `em ${t.concluidaEm}` : ''}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('tarefa-detail', t.id)}
                    className="text-slate-300 p-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Action Button (+ Nova tarefa) */}
      <button
        onClick={() => onNavigate('nova-tarefa')}
        className="fixed bottom-20 right-6 z-40 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-3.5 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center gap-2 font-semibold text-xs transition-transform active:scale-95"
        style={{ maxWidth: '430px' }}
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
        <span className="hidden sm:inline">Nova tarefa</span>
      </button>

      <BottomNav active="tarefas" onNavigate={onNavigate} />
    </div>
  )
}
