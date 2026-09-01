import { useState, useRef } from 'react'
import type { Screen, TarefaPessoal, NotificacaoItem } from './types'
import { tarefasIniciais, todasAtividades, notificacoesIniciais } from './data'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import AgendaScreen from './screens/AgendaScreen'
import DisciplinasScreen from './screens/DisciplinasScreen'
import DisciplinaDetalheScreen from './screens/DisciplinaDetalheScreen'
import ProvasTrabalhosScreen from './screens/ProvasTrabalhosScreen'
import TarefasScreen from './screens/TarefasScreen'
import NovaTarefaScreen from './screens/NovaTarefaScreen'
import TarefaDetalheScreen from './screens/TarefaDetalheScreen'
import AvaliacaoDetalheScreen from './screens/AvaliacaoDetalheScreen'
import NotificacoesScreen from './screens/NotificacoesScreen'
import Toast, { ToastState } from './components/Toast'

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [previousScreen, setPreviousScreen] = useState<Screen>('home')
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>('bd')
  const [selectedAvaliacaoId, setSelectedAvaliacaoId] = useState<number | null>(1)
  const [selectedTarefaId, setSelectedTarefaId] = useState<string | null>('t1')

  const [tarefas, setTarefas] = useState<TarefaPessoal[]>(tarefasIniciais)
  const [notificacoes, setNotificacoes] = useState<NotificacaoItem[]>(notificacoesIniciais)
  const [toast, setToast] = useState<ToastState | null>(null)
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null)

  const showToastSuccess = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message: msg, type: 'success' })
    toastTimerRef.current = setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  const showToastError = (msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message: msg, type: 'error' })
    toastTimerRef.current = setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  const navigate = (to: Screen, id?: string | number) => {
    if (screen !== to) {
      setPreviousScreen(screen)
    }

    if (to === 'disciplina-detail' && typeof id === 'string') {
      setSelectedDisciplinaId(id)
    } else if (to === 'avaliacao-detail') {
      if (typeof id === 'number') {
        setSelectedAvaliacaoId(id)
      } else if (typeof id === 'string') {
        setSelectedAvaliacaoId(parseInt(id, 10))
      }
    } else if (to === 'tarefa-detail' && typeof id === 'string') {
      setSelectedTarefaId(id)
    }

    setScreen(to)
    window.scrollTo(0, 0)
  }

  const handleCreateTask = (taskData: Omit<TarefaPessoal, 'id' | 'concluida'>) => {
    const newId = `t-${Date.now()}`
    const newTask: TarefaPessoal = {
      ...taskData,
      id: newId,
      concluida: false,
    }
    setTarefas((prev) => [newTask, ...prev])
    setSelectedTarefaId(newId)
    navigate('tarefas')
    showToastSuccess('Tarefa criada com sucesso.')
  }

  const handleToggleTask = (id: string) => {
    setTarefas((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.concluida
          showToastSuccess(nextState ? 'Tarefa concluída.' : 'Tarefa reaberta.')
          return {
            ...t,
            concluida: nextState,
            concluidaEm: nextState ? '01/09' : undefined,
          }
        }
        return t
      })
    )
  }

  const handleMarkNotifAsRead = (id: string) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    )
  }

  const handleMarkAllNotifsAsRead = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })))
    showToastSuccess('Notificações marcadas como lidas.')
  }

  return (
    <div className="min-h-full bg-slate-200 flex justify-center items-start">
      <div
        className="w-full max-w-[430px] min-h-screen bg-white relative flex flex-col shadow-2xl"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.12)' }}
      >
        <Toast toast={toast} onClose={() => setToast(null)} />

        {screen === 'login' && (
          <LoginScreen
            onLogin={() => navigate('home')}
            onError={(err) => showToastError(err)}
          />
        )}

        {screen === 'home' && (
          <HomeScreen
            onNavigate={navigate}
            tarefas={tarefas}
            notificacoes={notificacoes}
          />
        )}

        {screen === 'agenda' && (
          <AgendaScreen
            onNavigate={navigate}
            tarefas={tarefas}
            atividades={todasAtividades}
          />
        )}

        {screen === 'disciplinas' && <DisciplinasScreen onNavigate={navigate} />}

        {screen === 'disciplina-detail' && (
          <DisciplinaDetalheScreen
            disciplinaId={selectedDisciplinaId}
            onNavigate={navigate}
          />
        )}

        {screen === 'provas-trabalhos' && <ProvasTrabalhosScreen onNavigate={navigate} />}

        {screen === 'tarefas' && (
          <TarefasScreen
            onNavigate={navigate}
            tarefas={tarefas}
            onToggleTask={handleToggleTask}
          />
        )}

        {screen === 'nova-tarefa' && (
          <NovaTarefaScreen
            onNavigate={navigate}
            onCreateTask={handleCreateTask}
            showToastError={showToastError}
          />
        )}

        {screen === 'tarefa-detail' && (
          <TarefaDetalheScreen
            tarefaId={selectedTarefaId}
            tarefas={tarefas}
            onNavigate={navigate}
            onToggleTask={handleToggleTask}
          />
        )}

        {screen === 'avaliacao-detail' && (
          <AvaliacaoDetalheScreen
            avaliacaoId={selectedAvaliacaoId}
            onNavigate={navigate}
            onBack={() => navigate(previousScreen === 'avaliacao-detail' ? 'agenda' : previousScreen)}
          />
        )}

        {screen === 'notificacoes' && (
          <NotificacoesScreen
            notificacoes={notificacoes}
            onNavigate={navigate}
            onMarkAsRead={handleMarkNotifAsRead}
            onMarkAllAsRead={handleMarkAllNotifsAsRead}
            onBack={() => navigate(previousScreen === 'notificacoes' ? 'home' : previousScreen)}
          />
        )}
      </div>
    </div>
  )
}
