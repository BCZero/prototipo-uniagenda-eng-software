import { FileText, ClipboardList, CheckCircle2, GraduationCap } from 'lucide-react'

export type EventType = 'PROVA' | 'TRABALHO' | 'TAREFA PESSOAL' | 'COMPROMISSO ACADÊMICO'

interface Props {
  tipo: EventType
  size?: 'sm' | 'md'
}

export default function TypeBadge({ tipo, size = 'md' }: Props) {
  const iconSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs'
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'

  if (tipo === 'PROVA') {
    return (
      <span
        className={`inline-flex items-center gap-1 bg-blue-100 text-blue-700 font-semibold rounded-full ${textSize} ${padding}`}
      >
        <FileText className={iconSize} />
        PROVA
      </span>
    )
  }

  if (tipo === 'TRABALHO') {
    return (
      <span
        className={`inline-flex items-center gap-1 bg-amber-100 text-amber-700 font-semibold rounded-full ${textSize} ${padding}`}
      >
        <ClipboardList className={iconSize} />
        TRABALHO
      </span>
    )
  }

  if (tipo === 'TAREFA PESSOAL') {
    return (
      <span
        className={`inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 font-semibold rounded-full ${textSize} ${padding}`}
      >
        <CheckCircle2 className={iconSize} />
        TAREFA PESSOAL
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 font-semibold rounded-full ${textSize} ${padding}`}
    >
      <GraduationCap className={iconSize} />
      COMPROMISSO ACADÊMICO
    </span>
  )
}

