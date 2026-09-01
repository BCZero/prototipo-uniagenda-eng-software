import { ChevronLeft, Calendar, Clock, AlignLeft, CheckCircle2, Circle, ArrowLeft } from 'lucide-react'
import type { NavigateFn, TarefaPessoal } from '../types'

interface Props {
  tarefaId: string | null
  tarefas: TarefaPessoal[]
  onNavigate: NavigateFn
  onToggleTask: (id: string) => void
}

export default function TarefaDetalheScreen({
  tarefaId,
  tarefas,
  onNavigate,
  onToggleTask,
}: Props) {
  const tarefa = tarefas.find((t) => t.id === tarefaId) || tarefas[0]

  if (!tarefa) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">Tarefa não encontrada.</p>
        <button onClick={() => onNavigate('tarefas')} className="text-blue-600 font-semibold mt-4">
          Voltar para Tarefas
        </button>
      </div>
    )
  }

  const handleToggle = () => {
    onToggleTask(tarefa.id)
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="bg-white px-5 pt-12 pb-5 border-b border-slate-100">
          <button
            onClick={() => onNavigate('tarefas')}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm mb-4 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
            Minhas tarefas
          </button>

          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Detalhes da Tarefa
              </span>
              <h1 className={`text-xl font-bold ${tarefa.concluida ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                {tarefa.titulo}
              </h1>
            </div>

            {/* Status Badge */}
            {tarefa.concluida ? (
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Concluída
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs shrink-0">
                <Circle className="w-3.5 h-3.5 text-amber-600" />
                Pendente
              </span>
            )}
          </div>
        </div>

        {/* Task Properties Card */}
        <div className="p-4 space-y-3">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
            {/* Status Field */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold">Status:</span>
              <span className={`font-bold ${tarefa.concluida ? 'text-emerald-600' : 'text-slate-800'}`}>
                {tarefa.concluida ? '✓ Concluída' : 'Pendente'}
              </span>
            </div>

            {/* Prazo Field */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                Prazo:
              </span>
              <span className="font-mono font-bold text-slate-900">{tarefa.data}</span>
            </div>

            {/* Horário Field */}
            {tarefa.horario && (
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Horário:
                </span>
                <span className="font-mono font-bold text-slate-900">{tarefa.horario}</span>
              </div>
            )}

            {/* Descrição Field */}
            {tarefa.descricao && (
              <div className="pt-1">
                <span className="text-xs font-semibold text-slate-500 block mb-1.5 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-blue-500" />
                  Descrição:
                </span>
                <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl leading-relaxed border border-slate-100">
                  {tarefa.descricao}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-2.5">
        <button
          onClick={handleToggle}
          className={`w-full py-4 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 ${
            tarefa.concluida
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-emerald-200'
          }`}
        >
          {tarefa.concluida ? (
            <>Reabrir tarefa</>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Marcar como concluída
            </>
          )}
        </button>

        <button
          onClick={() => onNavigate('tarefas')}
          className="w-full py-3 rounded-xl font-semibold text-slate-500 hover:text-slate-700 text-xs flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para a lista
        </button>
      </div>
    </div>
  )
}
