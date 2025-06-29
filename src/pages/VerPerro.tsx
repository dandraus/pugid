import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import {
  Instagram,
  Facebook,
  Phone,
  MessageCircle,
  PawPrint,
  Link as LinkIcon
} from 'lucide-react'

export default function VerPerro() {
  const { id } = useParams()
  const [dog, setDog] = useState<any>(null)

  useEffect(() => {
    const fetchDog = async () => {
      const { data } = await supabase
        .from('dogs')
        .select('*')
        .eq('id', id)
        .single()
      setDog(data)
    }
    fetchDog()
  }, [id])

  if (!dog) return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-orange-100 via-white to-orange-200">
      <div className="text-orange-500 font-bold animate-pulse">Cargando perro...</div>
    </div>
  )

  return (
    
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-white to-orange-200 relative pt-20">
      {/* Logo arriba a la izquierda */}
   

      {/* Fondo decorativo */}
      <PawPrint className="absolute top-16 right-8 text-orange-200 opacity-30 w-16 h-16" />
      <PawPrint className="absolute bottom-8 left-8 text-orange-200 opacity-20 w-10 h-10 rotate-12" />

      {/* Card */}
      <div className="relative z-20 bg-white/90 shadow-2xl rounded-3xl p-8 flex flex-col items-center max-w-lg w-full mx-2 animate-fade-in my-16">
        {/* Foto */}
        <img
          src={dog.foto_url}
          alt={dog.nombre}
          className="max-w-[500px] max-h-[500px] w-full h-auto object-cover rounded-2xl border-4 border-orange-300 shadow-lg mb-10"
        />
        {/* Nombre */}
        <h1 className="text-4xl font-extrabold text-orange-600 mt-2 mb-1 text-center">{dog.nombre}</h1>
        {/* Chip y nacimiento */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 text-base text-gray-700">
          {dog.chip_id && (
            <span className=" text-lg px-3 py-1 bg-orange-100 rounded-xl font-semibold">
              Chip: {dog.chip_id}
            </span>
          )}
          {dog.fecha_nacimiento && (
            <span className="  px-3 py-1 bg-orange-50 rounded-xl font-semibold">
              Nacimiento: {dog.fecha_nacimiento}


            </span>
          )}
        </div>
        {/* Contacto */}
        {dog.contacto && (
          <div className="flex items-center gap-3 mb-1 text-xl text-gray-800">
            <Phone className="w-6 h-6 text-orange-400" />
            <span>{dog.contacto}</span>
               
          </div>
        )}
        {/* Redes sociales */}
        <div className="flex flex-wrap justify-center gap-4 mb-3 w-full">
          {dog.instagram && (
            <a
              href={dog.instagram.startsWith('http') ? dog.instagram : `https://instagram.com/${dog.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-xl text-pink-600 font-semibold hover:bg-pink-100 text-lg transition"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </a>
          )}
          {dog.facebook && (
            <a
              href={dog.facebook.startsWith('http') ? dog.facebook : `https://facebook.com/${dog.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl text-blue-700 font-semibold hover:bg-blue-100 text-lg transition"
            >
              <Facebook className="w-5 h-5" /> Facebook
            </a>
          )}
          {dog.tiktok && (
            <a
              href={dog.tiktok.startsWith('http') ? dog.tiktok : `https://tiktok.com/@${dog.tiktok.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-black font-semibold hover:bg-gray-200 text-lg transition"
            >
              <MessageCircle className="w-5 h-5" /> TikTok
            </a>
          )}
          {dog.whatsapp && (
            <a
              href={
                dog.whatsapp.startsWith('http')
                  ? dog.whatsapp
                  : `https://wa.me/${dog.whatsapp.replace(/\D/g, '')}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl text-green-700 font-semibold hover:bg-green-100 text-lg transition"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          )}
          {dog.otro_link && (
            <a
              href={dog.otro_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl text-orange-500 font-semibold hover:bg-orange-100 text-lg transition"
            >
              <LinkIcon className="w-5 h-5" /> Otro
            </a>
          )}
        </div>
        {/* Puedes agregar más módulos aquí */}
      </div>
    </div>
  )
}
