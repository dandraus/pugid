import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    alert(error.message)
  } else {
    window.location.href = '/dashboard'
  }
}
  return (
    <div className="w-full h-screen flex items-center justify-center bg-orange-50 px-4">
      <div
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center 
        animate-fade-in-down"
      >
        {/* Logo */}
        <div className="w-[200px] h-[200px] mb-6 flex items-center justify-center bg-orange-100 rounded-xl shadow-inner overflow-hidden">
          <img
            src="/pugid-logo.png"
            alt="Logo PugID"
            className="object-contain max-w-full max-h-full"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Inicia sesión en PugID 🐶
        </h1>

        {/* Formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
          className="w-full flex flex-col space-y-5"
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Ingresar
          </button>
        </form>

        {/* Enlace de registro */}
        <p className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-orange-500 font-medium hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
