import { ChevronLeft, BookOpen, Clock, MapPin, FileText } from 'lucide-react'
import type { NavigateFn } from '../types'
import { disciplinas, todasAtividades } from '../data'
import TypeBadge from '../components/TypeBadge'

interface Props {
  disciplinaId: string
  onNavigate: NavigateFn
}

export default function DisciplinaDetalheScreen({ disciplinaId, onNavigate }: Props) {
  const disciplina = disciplinas.find((d) => d.id === disciplinaId) ?? disciplinas[0]
  const atividades = todasAtividades.filter((a) => a.disciplinaId === disciplinaId)

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header with accent color */}
      <div
        className={`px-5 pt-12 pb-7 ${disciplina.bgAccent}`}
        style={
          disciplinaId === 'bd'
            ? { background: 'linear-gradient(160deg, #1e40af 0%, #2563eb 100%)' }
            : disciplinaId === 'es'
            ? { background: 'linear-gradient(160deg, #3730a3 0%, #4f46e5 100%)' }
            : { background: 'linear-gradient(160deg, #5b21b6 0%, #7c3aed 100%)' }
        }
      >
        {/* Back button */}
        <button
          onClick={() => onNavigate('disciplinas')}
          className="flex items-center gap-1 text-white/75 hover:text-white mb-5 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          Minhas disciplinas
        </button>

        {/* Discipline info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/25 shrink-0">
            <BookOpen className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-snug">{disciplina.nome}</h1>
            <p className="text-white/70 text-sm mt-0.5">{disciplina.professor}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3">
          Próximas avaliações e trabalhos
        </h2>

        {atividades.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" strokeWidth={1.25} />
            <p className="text-slate-400 text-sm">Nenhuma atividade cadastrada.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {atividades.map((a) => (
              <div
                key={a.id}
                onClick={() => onNavigate('avaliacao-detail', a.id)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:border-blue-200 cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <TypeBadge tipo={a.tipo} />
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg font-mono">
                    {a.dataCompleta}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-900 mb-3 leading-snug">
                  {a.titulo}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                    <span>{a.horario}</span>
                  </div>
                  {a.local && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                      <span>{a.local}</span>
                    </div>
                  )}
                  {a.conteudo && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="font-semibold text-slate-600">Conteúdo: </span>
                      <span>{a.conteudo}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
