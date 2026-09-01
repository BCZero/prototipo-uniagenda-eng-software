import { ChevronLeft, Clock, Calendar } from 'lucide-react'
import type { NavigateFn } from '../types'
import { todasAtividades } from '../data'
import TypeBadge from '../components/TypeBadge'
import BottomNav from '../components/BottomNav'

interface Props {
  onNavigate: NavigateFn
}

function DateChip({ data }: { data: string }) {
  const [day, month] = data.split(' ')
  return (
    <div className="flex flex-col items-center justify-center w-12 shrink-0">
      <span className="text-lg font-bold text-blue-600 leading-none">{day}</span>
      <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide mt-0.5">
        {month}
      </span>
    </div>
  )
}

export default function ProvasTrabalhosScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5 border-b border-slate-100">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-700 mb-3 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          Início
        </button>
        <h1 className="text-xl font-bold text-slate-900">Provas e trabalhos</h1>
        <p className="text-sm text-slate-500 mt-0.5">Seus próximos compromissos acadêmicos</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <div className="space-y-3">
          {todasAtividades.map((a) => (
            <div
              key={a.id}
              onClick={() => onNavigate('avaliacao-detail', a.id)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-blue-200 cursor-pointer active:scale-[0.99] transition-all"
            >
              <div className="flex items-stretch">
                {/* Date column */}
                <div className="flex flex-col items-center justify-center px-4 py-4 bg-slate-50 border-r border-slate-100 shrink-0 w-16">
                  <span className="text-lg font-bold text-blue-600 leading-none">
                    {a.data.split(' ')[0]}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide mt-0.5">
                    {a.data.split(' ')[1]}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 px-4 py-4 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <TypeBadge tipo={a.tipo} size="sm" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug mb-2">
                    {a.tituloLista}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-medium truncate">{a.disciplina}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" strokeWidth={1.75} />
                      {a.horario}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-6 px-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 shrink-0">{todasAtividades.length} atividades</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-200 inline-block" />
            <span className="text-xs text-slate-500">Prova</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-200 inline-block" />
            <span className="text-xs text-slate-500">Trabalho</span>
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  )
}
