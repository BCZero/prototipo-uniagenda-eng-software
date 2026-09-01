import { useState } from 'react'
import { ChevronLeft, Calendar, Clock, AlignLeft, Sparkles, AlertCircle } from 'lucide-react'
import type { NavigateFn, TarefaPessoal } from '../types'

interface Props {
  onNavigate: NavigateFn
  onCreateTask: (task: Omit<TarefaPessoal, 'id' | 'concluida'>) => void
  showToastError?: (msg: string) => void
}

export default function NovaTarefaScreen({ onNavigate, onCreateTask, showToastError }: Props) {
  const [titulo, setTitulo] = useState('')
  const [data, setData] = useState('01/09/2026')
  const [horario, setHorario] = useState('20:00')
  const [descricao, setDescricao] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  // Quick fill scenario for Sprint Review demonstration
  const handlePreencherExemplo = () => {
    setTitulo('Revisar SQL')
    setData('01/09/2026')
    setHorario('20:00')
    setDescricao('Revisar SELECT, JOIN e GROUP BY para a prova de Banco de Dados.')
    setFormError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Sprint 3 validation requirements
    if (!titulo.trim()) {
      const err = 'Informe um título para a tarefa.'
      setFormError(err)
      if (showToastError) showToastError(err)
      return
    }

    if (!data.trim()) {
      const err = 'Informe a data de entrega.'
      setFormError(err)
      if (showToastError) showToastError(err)
      return
    }

    const taskTitle = titulo.trim()
    const taskDate = data.trim()

    // Determine diaSemana and formatted data
    let diaSemana: TarefaPessoal['diaSemana'] = 'TER'
    if (taskDate.startsWith('01/09')) diaSemana = 'TER'
    else if (taskDate.startsWith('04/09')) diaSemana = 'SEX'
    else if (taskDate.startsWith('05/09')) diaSemana = 'SÁB'
    else if (taskDate.startsWith('06/09')) diaSemana = 'DOM'
    else if (taskDate.startsWith('31/08')) diaSemana = 'SEG'

    const parts = taskDate.split('/')
    const day = parts[0] || '01'
    const monthNum = parts[1] || '09'
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    const dataFormatted = `${day} ${months[parseInt(monthNum, 10) - 1] || 'SET'}`

    onCreateTask({
      titulo: taskTitle,
      data: taskDate,
      dataFormatted,
      diaSemana,
      horario: horario.trim() || undefined,
      descricao: descricao.trim() || undefined,
    })
  }

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <button
          onClick={() => onNavigate('tarefas')}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
          Cancelar
        </button>
        <h1 className="text-base font-bold text-slate-900">Nova tarefa</h1>
        <div className="w-12" />
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} className="flex-1 px-5 pt-5 pb-8 flex flex-col justify-between" noValidate>
        <div className="space-y-4">
          {/* Helper fill button */}
          <button
            type="button"
            onClick={handlePreencherExemplo}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold py-2.5 px-3 rounded-xl border border-blue-200/60 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Preencher exemplo da Sprint Review ("Revisar SQL")
          </button>

          {/* Validation Error Message */}
          {formError && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-3 flex items-center gap-2.5 text-rose-900 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>⚠ {formError}</span>
            </div>
          )}

          {/* TÍTULO */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Título *
            </label>
            <input
              type="text"
              placeholder="Ex.: Revisar SQL"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value)
                if (formError) setFormError(null)
              }}
              className={`w-full px-4 py-3.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 text-sm transition-colors ${
                formError && !titulo.trim()
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-500'
                  : 'border-slate-200 bg-slate-50 focus:bg-white focus:ring-blue-500'
              }`}
            />
          </div>

          {/* DATA DE ENTREGA & HORÁRIO */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Data de entrega *
              </label>
              <input
                type="text"
                placeholder="Selecione uma data"
                value={data}
                onChange={(e) => {
                  setData(e.target.value)
                  if (formError) setFormError(null)
                }}
                className={`w-full px-3.5 py-3 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 text-sm transition-colors font-mono ${
                  formError && !data.trim()
                    ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-500'
                    : 'border-slate-200 bg-slate-50 focus:bg-white focus:ring-blue-500'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Horário (opcional)
              </label>
              <input
                type="text"
                placeholder="Selecione um horário"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full px-3.5 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 focus:bg-white transition-colors font-mono"
              />
            </div>
          </div>

          {/* DESCRIÇÃO / OBSERVAÇÕES */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <AlignLeft className="w-3 h-3 text-slate-400" />
              Descrição / Observações
            </label>
            <textarea
              rows={4}
              placeholder="Adicione detalhes sobre a tarefa"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 focus:bg-white transition-colors resize-none"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5 pt-6 mt-auto">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-sm shadow-blue-200"
          >
            Criar tarefa
          </button>
          <button
            type="button"
            onClick={() => onNavigate('tarefas')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
