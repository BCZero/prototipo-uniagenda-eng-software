import { useState } from 'react'
import { Clock, MapPin, Calendar as CalendarIcon, ChevronRight, Filter, X, SearchX } from 'lucide-react'
import type { NavigateFn, TarefaPessoal, Atividade, AgendaCategoriaFiltro, AgendaDisciplinaFiltro } from '../types'
import BottomNav from '../components/BottomNav'
import TypeBadge, { EventType } from '../components/TypeBadge'

interface Props {
  onNavigate: NavigateFn
  tarefas: TarefaPessoal[]
  atividades: Atividade[]
}

interface AcademicCommitment {
  id: string
  diaSemana: 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SÁB' | 'DOM'
  dataStr: string
  horario: string
  titulo: string
  disciplina: string
  disciplinaId: string
  tipo: 'COMPROMISSO ACADÊMICO'
  local?: string
}

const compromissosFixos: AcademicCommitment[] = [
  {
    id: 'c1',
    diaSemana: 'SEG',
    dataStr: '31/08/2026',
    horario: '19:00',
    titulo: 'Aula de Engenharia de Software',
    disciplina: 'Engenharia de Software',
    disciplinaId: 'es',
    tipo: 'COMPROMISSO ACADÊMICO',
    local: 'Lab 03',
  },
]

export default function AgendaScreen({ onNavigate, tarefas, atividades }: Props) {
  // Days of the week 31 AGO — 06 SET
  const dias = [
    { key: 'SEG', dayNum: '31', fullDate: '31/08/2026', label: 'SEG 31' },
    { key: 'TER', dayNum: '01', fullDate: '01/09/2026', label: 'TER 01' },
    { key: 'QUA', dayNum: '02', fullDate: '02/09/2026', label: 'QUA 02' },
    { key: 'QUI', dayNum: '03', fullDate: '03/09/2026', label: 'QUI 03' },
    { key: 'SEX', dayNum: '04', fullDate: '04/09/2026', label: 'SEX 04' },
    { key: 'SÁB', dayNum: '05', fullDate: '05/09/2026', label: 'SÁB 05' },
    { key: 'DOM', dayNum: '06', fullDate: '06/09/2026', label: 'DOM 06' },
  ]

  const [selectedDay, setSelectedDay] = useState<string>('QUA')
  const [categoriaFiltro, setCategoriaFiltro] = useState<AgendaCategoriaFiltro>('TODOS')
  const [disciplinaFiltro, setDisciplinaFiltro] = useState<AgendaDisciplinaFiltro>('TODOS')

  // Helper for mapping date strings
  const getItemDayKey = (dateStr: string) => {
    if (dateStr.includes('31/08') || dateStr.includes('31 AGO')) return 'SEG'
    if (dateStr.includes('01/09') || dateStr.includes('01 SET')) return 'TER'
    if (dateStr.includes('02/09') || dateStr.includes('02 SET')) return 'QUA'
    if (dateStr.includes('03/09') || dateStr.includes('03 SET')) return 'QUI'
    if (dateStr.includes('04/09') || dateStr.includes('04 SET')) return 'SEX'
    if (dateStr.includes('05/09') || dateStr.includes('05 SET')) return 'SÁB'
    if (dateStr.includes('06/09') || dateStr.includes('06 SET')) return 'DOM'
    return 'OUTRO'
  }

  // Unified items
  const allEventsForWeek = [
    ...compromissosFixos.map((c) => ({
      id: c.id,
      dayKey: c.diaSemana,
      horario: c.horario,
      tipo: 'COMPROMISSO ACADÊMICO' as EventType,
      titulo: c.titulo,
      subtitulo: c.disciplina,
      disciplinaId: c.disciplinaId,
      local: c.local,
      isTask: false,
      isAcademic: true,
      rawItem: c,
    })),
    ...atividades
      .filter((a) => ['01 SET', '02 SET', '04 SET', '05 SET', '31 AGO', '06 SET', '15 SET'].some((d) => a.data.includes(d)))
      .map((a) => ({
        id: `atv-${a.id}`,
        dayKey: getItemDayKey(a.dataCompleta || a.data),
        horario: a.horario,
        tipo: a.tipo as EventType,
        titulo: a.tituloLista || a.titulo,
        subtitulo: a.disciplina,
        disciplinaId: a.disciplinaId,
        local: a.local,
        isTask: false,
        isAcademic: true,
        rawItem: a,
      })),
    ...tarefas.map((t) => ({
      id: `task-${t.id}`,
      dayKey: t.diaSemana,
      horario: t.horario || 'Dia todo',
      tipo: 'TAREFA PESSOAL' as EventType,
      titulo: t.titulo,
      subtitulo: `Prazo: ${t.data.slice(0, 5)}`,
      disciplinaId: 'PESSOAL',
      local: undefined,
      isTask: true,
      concluida: t.concluida,
      isAcademic: false,
      rawItem: t,
    })),
  ]

  // Filter logic for Sprint 3 (US07)
  const isFilterActive = categoriaFiltro !== 'TODOS' || disciplinaFiltro !== 'TODOS'

  const filteredEvents = allEventsForWeek.filter((evt) => {
    // Filter by day
    if (selectedDay !== 'TODOS' && evt.dayKey !== selectedDay) {
      return false
    }

    // Filter by category (Acadêmico vs Pessoal)
    if (categoriaFiltro === 'ACADEMICO' && evt.isTask) {
      return false
    }
    if (categoriaFiltro === 'PESSOAL' && !evt.isTask) {
      return false
    }

    // Filter by discipline
    if (disciplinaFiltro !== 'TODOS') {
      if (evt.isTask) return false
      if (evt.disciplinaId !== disciplinaFiltro) return false
    }

    return true
  })

  const handleLimparFiltros = () => {
    setCategoriaFiltro('TODOS')
    setDisciplinaFiltro('TODOS')
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-5"
        style={{ background: 'linear-gradient(160deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Minha Agenda</h1>
            <p className="text-blue-100 text-xs mt-1">Organize seus compromissos da semana.</p>
          </div>
          <div className="bg-white/15 backdrop-blur px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>31 AGO — 06 SET</span>
          </div>
        </div>

        {/* Days Bar */}
        <div className="flex items-center justify-between gap-1.5 mt-4 overflow-x-auto pb-1 no-scrollbar">
          {dias.map((d) => {
            const isSelected = selectedDay === d.key
            const hasEvents = allEventsForWeek.some((e) => e.dayKey === d.key)

            return (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`flex-1 min-w-[48px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white text-blue-700 shadow-md font-bold scale-105'
                    : 'bg-white/15 text-white/90 hover:bg-white/25 font-medium'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider opacity-80">{d.key}</span>
                <span className="text-sm leading-tight font-extrabold mt-0.5">{d.dayNum}</span>
                {hasEvents && (
                  <span
                    className={`w-1 h-1 rounded-full mt-1 ${
                      isSelected ? 'bg-blue-600' : 'bg-white/80'
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sprint 3 Filters Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            Filtros
          </span>

          {isFilterActive && (
            <button
              onClick={handleLimparFiltros}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-lg transition-colors"
            >
              <X className="w-3 h-3" />
              Limpar filtro
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setCategoriaFiltro('TODOS')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              categoriaFiltro === 'TODOS'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            [Todos]
          </button>
          <button
            onClick={() => setCategoriaFiltro('ACADEMICO')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              categoriaFiltro === 'ACADEMICO'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            [Acadêmico]
          </button>
          <button
            onClick={() => setCategoriaFiltro('PESSOAL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              categoriaFiltro === 'PESSOAL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            [Pessoal]
          </button>
        </div>

        {/* Discipline Filter Chips */}
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-slate-400 shrink-0">Disciplina:</span>
          <button
            onClick={() => setDisciplinaFiltro('bd')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
              disciplinaFiltro === 'bd'
                ? 'bg-blue-100 text-blue-800 border border-blue-300 font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {disciplinaFiltro === 'bd' ? 'Banco de Dados ✓' : 'Banco de Dados'}
          </button>
          <button
            onClick={() => setDisciplinaFiltro('es')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
              disciplinaFiltro === 'es'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {disciplinaFiltro === 'es' ? 'Engenharia de Software ✓' : 'Engenharia de Software'}
          </button>
          <button
            onClick={() => setDisciplinaFiltro('dw')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
              disciplinaFiltro === 'dw'
                ? 'bg-violet-100 text-violet-800 border border-violet-300 font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {disciplinaFiltro === 'dw' ? 'Desenvolvimento Web ✓' : 'Desenvolvimento Web'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* Selected Day Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            {selectedDay === 'SEG' && 'SEGUNDA-FEIRA — 31 AGO'}
            {selectedDay === 'TER' && 'TERÇA-FEIRA — 01 SET'}
            {selectedDay === 'QUA' && 'QUARTA-FEIRA — 02 SET'}
            {selectedDay === 'QUI' && 'QUINTA-FEIRA — 03 SET'}
            {selectedDay === 'SEX' && 'SEXTA-FEIRA — 04 SET'}
            {selectedDay === 'SÁB' && 'SÁBADO — 05 SET'}
            {selectedDay === 'DOM' && 'DOMINGO — 06 SET'}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'evento' : 'eventos'}
          </span>
        </div>

        {/* Empty State when filter yields no results */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-xs my-4 space-y-3">
            <SearchX className="w-10 h-10 text-slate-400 mx-auto" strokeWidth={1.5} />
            <div>
              <p className="text-slate-800 font-bold text-sm">Nenhum compromisso encontrado.</p>
              <p className="text-slate-500 text-xs mt-1">Tente selecionar outro período ou disciplina.</p>
            </div>
            {isFilterActive && (
              <button
                onClick={handleLimparFiltros}
                className="mt-2 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((evt) => {
              const handleCardClick = () => {
                if (evt.isTask) {
                  onNavigate('tarefa-detail', (evt.rawItem as TarefaPessoal).id)
                } else if (evt.rawItem && 'tipo' in evt.rawItem && (evt.rawItem.tipo === 'PROVA' || evt.rawItem.tipo === 'TRABALHO')) {
                  onNavigate('avaliacao-detail', (evt.rawItem as Atividade).id)
                }
              }

              return (
                <div
                  key={evt.id}
                  onClick={handleCardClick}
                  className={`bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-all ${
                    evt.isTask && (evt.rawItem as TarefaPessoal).concluida ? 'opacity-65 bg-slate-50' : 'hover:border-blue-200'
                  } ${
                    evt.isTask || (evt.rawItem && 'tipo' in evt.rawItem && (evt.rawItem.tipo === 'PROVA' || evt.rawItem.tipo === 'TRABALHO'))
                      ? 'cursor-pointer active:scale-[0.99]'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {evt.horario}
                    </span>
                    <TypeBadge tipo={evt.tipo} size="sm" />
                  </div>

                  <p className={`text-sm font-bold text-slate-900 mb-1 leading-snug ${
                    evt.isTask && (evt.rawItem as TarefaPessoal).concluida ? 'line-through text-slate-500' : ''
                  }`}>
                    {evt.titulo}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                    <span className="font-medium text-slate-600">{evt.subtitulo}</span>
                    {evt.local && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {evt.local}
                      </span>
                    )}
                    {(evt.isTask || (evt.rawItem && 'tipo' in evt.rawItem && (evt.rawItem.tipo === 'PROVA' || evt.rawItem.tipo === 'TRABALHO'))) && (
                      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Tipos de compromisso
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-blue-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              📝 Prova
            </div>
            <div className="flex items-center gap-1.5 text-amber-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              📄 Trabalho
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ✅ Tarefa pessoal
            </div>
            <div className="flex items-center gap-1.5 text-indigo-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              🎓 Acadêmico
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="agenda" onNavigate={onNavigate} />
    </div>
  )
}
