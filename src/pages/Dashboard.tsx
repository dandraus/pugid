import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [dogs, setDogs] = useState<any[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data?.user) {
        window.location.href = '/login'
        return
      }
      setUser(data.user)
      // Carga los perros de este usuario
      const { data: dogsData } = await supabase
        .from('dogs')
        .select('*')
        .eq('owner_id', data.user.id)
      setDogs(dogsData || [])
    })
  }, [])

  const publicUrlBase = `${window.location.origin}/ver-perro/`

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white shadow-xl rounded-3xl p-10 sm:p-12 flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl font-extrabold text-orange-600 mb-6 text-center">
          Mis perros
        </h1>

        {dogs.length === 0 && (
          <div className="text-gray-500 text-center mb-6">
            ¡Agrega tu primer perro!
          </div>
        )}

        <div className="w-full space-y-6">
          {dogs.map(dog => (
            <div
              key={dog.id}
              className="mb-2 p-4 rounded-xl bg-orange-50 shadow flex flex-col items-center"
            >
              <img
                src={dog.foto_url}
                alt={dog.nombre}
                className="max-w-[500px] max-h-[500px] w-full h-auto object-cover rounded-xl mb-2"              />
              <img
  
  
/>
              <div className="font-bold text-orange-600">{dog.nombre}</div>
              <a
                href={`${publicUrlBase}${dog.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 text-xs break-all"
              >
                {`${publicUrlBase}${dog.id}`}
              </a>
              <button
                className="text-xs text-orange-500 underline mt-1"
                onClick={() => {
                  navigator.clipboard.writeText(`${publicUrlBase}${dog.id}`)
                  setCopiedId(dog.id)
                  setTimeout(() => setCopiedId(null), 1500)
                }}
              >
                {copiedId === dog.id ? '¡Copiado!' : 'Copiar URL'}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/agregar-perro')}
          className="mt-8 w-full max-w-[300px] bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition text-lg shadow mx-auto"
        >
          ➕ Agregar perro
        </button>
      </div>
    </div>
  )
}
