import { useState } from 'react'
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'

interface Props {
  onLogin: () => void
  onError?: (msg: string) => void
}

function LogoMark() {
  return (
    <svg viewBox="0 0 48 40" className="w-11 h-9" fill="none" aria-hidden="true">
      <path d="M24 2L44 13v2L24 26 4 15v-2L24 2Z" fill="white" fillOpacity="0.9" />
      <path d="M10 17v11c0 4.4 6.3 8 14 8s14-3.6 14-8V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" />
      <rect x="42" y="12" width="3" height="14" rx="1.5" fill="white" fillOpacity="0.6" />
      <circle cx="43.5" cy="28" r="2" fill="white" fillOpacity="0.6" />
    </svg>
  )
}

export default function LoginScreen({ onLogin, onError }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [matricula, setMatricula] = useState('202612345')
  const [senha, setSenha] = useState('******')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Simulate validation error scenario if inputs are empty
    if (!matricula.trim() || !senha.trim()) {
      const err = 'Identificação acadêmica ou senha inválida.'
      setErrorMessage(err)
      if (onError) onError(err)
      return
    }

    // Simulate loading spinner state for realism
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 600)
  }

  // Demonstration helper: trigger invalid login error
  const handleSimulateError = () => {
    setMatricula('99999999')
    setSenha('errada')
    setErrorMessage('Identificação acadêmica ou senha inválida.')
  }

  return (
    <div className="min-h-full bg-white flex flex-col justify-between">
      <div>
        {/* Blue header */}
        <div
          className="px-6 pt-16 pb-12 flex flex-col items-center"
          style={{ background: 'linear-gradient(160deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)' }}
        >
          <div className="w-20 h-20 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center mb-5 border border-white/20 shadow-md">
            <LogoMark />
          </div>
          <h1 className="text-[28px] font-bold text-white tracking-tight">UniAgenda</h1>
          <p className="text-blue-200 text-sm mt-1 font-medium">Universidade Horizonte</p>
        </div>

        {/* Form area */}
        <form onSubmit={handleLogin} className="px-6 pt-7 pb-4">
          <p className="text-slate-500 text-sm text-center mb-6 leading-relaxed">
            Organize sua vida acadêmica em um só lugar.
          </p>

          {/* Accessible Error Variant Message */}
          {errorMessage && (
            <div className="mb-5 bg-rose-50 border-2 border-rose-300 rounded-xl p-3.5 flex items-center gap-3 text-rose-900 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 stroke-[2.2]" />
              <div className="text-xs">
                <span className="font-extrabold block">⚠ Erro no login</span>
                <span className="font-medium text-rose-800">{errorMessage}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Identificação acadêmica
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Digite sua matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className={`w-full px-4 py-3.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 text-sm transition-colors ${
                  errorMessage
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500 font-semibold'
                    : 'border-slate-200 bg-slate-50 focus:bg-white focus:ring-blue-500'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={`w-full px-4 py-3.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 text-sm pr-12 transition-colors ${
                    errorMessage
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500 font-semibold'
                      : 'border-slate-200 bg-slate-50 focus:bg-white focus:ring-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors text-sm mt-2 shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                className="text-blue-600 text-xs font-semibold hover:text-blue-700 hover:underline transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer hints and Error Simulation helper */}
      <div className="px-6 pb-8 text-center space-y-2">
        <button
          type="button"
          onClick={handleSimulateError}
          className="text-rose-600 text-xs font-semibold hover:underline bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200/60 inline-flex items-center gap-1"
        >
          <span>⚠ Testar mensagem de erro no login</span>
        </button>

        <p className="text-xs text-slate-400">
          Matrícula de exemplo:{' '}
          <button
            type="button"
            onClick={() => {
              setMatricula('202612345')
              setSenha('******')
              setErrorMessage(null)
            }}
            className="font-mono text-blue-600 font-bold hover:underline"
          >
            202612345
          </button>
        </p>
      </div>
    </div>
  )
}
