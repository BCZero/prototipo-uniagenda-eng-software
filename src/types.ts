export type Screen =
  | 'login'
  | 'home'
  | 'agenda'
  | 'disciplinas'
  | 'disciplina-detail'
  | 'provas-trabalhos'
  | 'tarefas'
  | 'nova-tarefa'
  | 'tarefa-detail'
  | 'avaliacao-detail'
  | 'notificacoes'

export interface Disciplina {
  id: string
  nome: string
  professor: string
  proximaAtividade: string
  bgAccent: string
  bgLight: string
  textAccent: string
  borderAccent: string
}

export interface Atividade {
  id: number
  tipo: 'PROVA' | 'TRABALHO'
  titulo: string
  tituloLista: string
  disciplina: string
  disciplinaId: string
  data: string
  dataCompleta: string
  horario: string
  local?: string
  conteudo?: string
  professor?: string
}

export interface TarefaPessoal {
  id: string
  titulo: string
  data: string // ex: '01/09/2026'
  dataFormatted: string // ex: '01 SET'
  diaSemana: 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SÁB' | 'DOM'
  horario?: string // ex: '20:00'
  descricao?: string
  concluida: boolean
  concluidaEm?: string
}

export interface NotificacaoItem {
  id: string
  tipo: 'PRAZO_PROXIMO' | 'TRABALHO' | 'ALTERACAO_ACADEMICA' | 'TAREFA'
  titulo: string
  mensagem: string
  tempo: string // ex: 'Hoje • 08:00'
  lida: boolean
  targetType?: 'avaliacao' | 'tarefa'
  targetId?: number | string
}

export type AgendaCategoriaFiltro = 'TODOS' | 'ACADEMICO' | 'PESSOAL'
export type AgendaDisciplinaFiltro = 'TODOS' | 'bd' | 'es' | 'dw'

export type NavigateFn = (to: Screen, id?: string | number) => void


