import { BookOpen, ChevronRight } from 'lucide-react'
import type { NavigateFn } from '../types'
import { disciplinas } from '../data'
import BottomNav from '../components/BottomNav'

interface Props {
  onNavigate: NavigateFn
}

export default function DisciplinasScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-5 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">Minhas disciplinas</h1>
        <p className="text-sm text-slate-500 mt-0.5">Disciplinas em que você está matriculado</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <div className="space-y-3">
          {disciplinas.map((d) => (
            <button
              key={d.id}
              onClick={() => onNavigate('disciplina-detail', d.id)}
              className="w-full bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 text-left hover:border-slate-200 active:scale-[0.99] transition-all"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${d.bgLight} flex items-center justify-center shrink-0`}
              >
                <BookOpen className={`w-6 h-6 ${d.textAccent}`} strokeWidth={1.5} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-slate-900 leading-snug">{d.nome}</p>
                <p className="text-xs text-slate-500 mt-0.5">{d.professor}</p>
                <p className={`text-xs mt-2 ${d.textAccent} font-medium`}>
                  Próxima atividade: {d.proximaAtividade}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          {disciplinas.length} disciplinas matriculadas neste semestre
        </p>
      </div>

      <BottomNav active="disciplinas" onNavigate={onNavigate} />
    </div>
  )
}
