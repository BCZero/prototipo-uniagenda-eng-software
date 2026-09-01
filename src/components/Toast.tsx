import { CheckCircle2, AlertCircle } from 'lucide-react'

export interface ToastState {
  message: string | null
  type?: 'success' | 'error'
}

interface ToastProps {
  toast: ToastState | null
  onClose?: () => void
}

export default function Toast({ toast, onClose }: ToastProps) {
  if (!toast || !toast.message) return null

  const isError = toast.type === 'error'

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-[390px] transition-all">
      <div
        className={`px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between border backdrop-blur ${
          isError
            ? 'bg-rose-900/95 border-rose-700 text-white'
            : 'bg-slate-900/95 border-slate-700 text-white'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {isError ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xs ml-2 font-bold px-1"
            aria-label="Fechar mensagem"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
