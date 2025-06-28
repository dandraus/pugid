import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user)
      } else {
        window.location.href = '/login'
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 sm:p-12 flex flex-col items-center max-w-md w-full animate-fade-in-down">
        {/* Logo grande */}
        <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] mb-4 flex items-center justify-center bg-orange-100 rounded-xl shadow-inner overflow-hidden">
          <img
            src="/pugid-logo.png"
            alt="Logo PugID"
            className="object-contain max-w-full max-h-full"
          />
        </div>

        {/* Saludo */}
        <h1 className="text-2xl font-extrabold text-orange-600 mb-1 text-center">¡Hola, {user?.email?.split('@')[0] || "usuario"}!</h1>
        <p className="text-gray-500 text-center mb-6">{user?.email}</p>

        {/* Acciones */}
        <div className="w-full flex flex-col space-y-4">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition text-lg shadow">
            📡 Escanear chip RFID
          </button>
          <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-3 rounded-xl transition text-lg shadow">
            📝 Ver hoja de vida
          </button>
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-gray-200 hover:bg-orange-200 text-gray-700 font-medium py-2 rounded-xl text-base transition shadow-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
