import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-10 max-w-md w-full flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center w-[120px] h-[120px] bg-orange-100 rounded-xl shadow-inner overflow-hidden">
          <img
            src="/pugid-logo.png"
            alt="Logo PugID"
            className="object-contain max-w-full max-h-full"
          />
        </div>
        <h2 className="text-2xl font-extrabold text-orange-600 mb-6">Iniciar sesión</h2>
        <form className="w-full flex flex-col items-center space-y-4" onSubmit={handleLogin}>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="px-4 py-3 border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition max-w-[300px] w-full mx-auto"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="px-4 py-3 border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition max-w-[300px] w-full mx-auto"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow max-w-[300px] w-full mx-auto"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  )
}
