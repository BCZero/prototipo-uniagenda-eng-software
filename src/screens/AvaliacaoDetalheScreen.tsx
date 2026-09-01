import { ChevronLeft, Calendar, Clock, MapPin, BookOpen, User, FileText, ArrowLeft } from 'lucide-react'
import type { NavigateFn, Atividade } from '../types'
import { todasAtividades } from '../data'
import TypeBadge from '../components/TypeBadge'

interface Props {
  avaliacaoId: number | null
  onNavigate: NavigateFn
  onBack?: () => void
}

export default function AvaliacaoDetalheScreen({
  avaliacaoId,
  onNavigate,
  onBack,
}: Props) {
  const atv = todasAtividades.find((a) => a.id === avaliacaoId) || todasAtividades[0]

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      onNavigate('agenda')
    }
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Accent Header */}
        <div
          className="px-5 pt-12 pb-7 text-white"
          style={{ background: 'linear-gradient(160deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
            Voltar
          </button>

          <div className="flex items-center justify-between gap-3 mb-2">
            <TypeBadge tipo={atv.tipo} size="md" />
            <span className="text-xs font-bold text-white/90 bg-white/20 px-2.5 py-1 rounded-lg font-mono">
              {atv.dataCompleta}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white leading-tight mt-2">{atv.titulo}</h1>
          <p className="text-blue-100 text-sm font-semibold mt-1 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-200" />
            {atv.disciplina}
          </p>
        </div>

        {/* Content details */}
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              Informações da Avaliação
            </h2>

            {/* Data */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Data:
              </span>
              <span className="font-mono font-bold text-slate-900">{atv.dataCompleta}</span>
            </div>

            {/* Horário */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Horário:
              </span>
              <span className="font-mono font-bold text-slate-900">{atv.horario}</span>
            </div>

            {/* Local */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Local:
              </span>
              <span className="font-bold text-slate-900">{atv.local || 'A definir'}</span>
            </div>

            {/* Professor */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Professor:
              </span>
              <span className="font-semibold text-slate-800">{atv.professor || 'Prof. Ricardo Silva'}</span>
            </div>

            {/* Conteúdo */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-slate-500 block mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Conteúdo a ser avaliado:
              </span>
              <div className="bg-slate-50 p-4 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 leading-relaxed">
                {atv.conteudo || 'Consulte o plano de ensino da disciplina no AVA.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          onClick={handleBack}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>
    </div>
  )
}
