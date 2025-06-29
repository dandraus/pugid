import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function DogForm({ onAdded }: { onAdded?: () => void }) {
  const [nombre, setNombre] = useState('')
  const [chipId, setChipId] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [contacto, setContacto] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [otroLink, setOtroLink] = useState('')
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFotoFile(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }
useEffect(() => {
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data?.user) setUser(data.user)
  }
  fetchUser()
}, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubiendo(true)
    setError(null)
    let foto_url = ''
    try {
  if (fotoFile) {
    const fileExt = fotoFile.name.split('.').pop()
    const fileName = `${nombre}_${Date.now()}.${fileExt}`
    // Intenta subir la foto
    const { data, error: uploadError } = await supabase
      .storage
      .from('dog-photos')
      .upload(fileName, fotoFile)
      console.log('UPLOAD DATA:', data)
console.log('UPLOAD ERROR:', uploadError)
console.log('FILE NAME:', fileName)
console.log('FOTO FILE:', fotoFile)
    if (uploadError) {
      setError(`Error al subir la foto: ${uploadError.message}`)
      setSubiendo(false)
      return
    }
    foto_url = supabase.storage.from('dog-photos').getPublicUrl(fileName).data.publicUrl
  }

  // ... el resto de tu código para insertar en la tabla
} catch (err: any) {
  setError(`Error inesperado: ${err?.message || JSON.stringify(err)}`)
  setSubiendo(false)
}


    try {
      // 1. Subir la foto si existe
   


      // 2. Insertar el registro del perro
      const { error: insertError } = await supabase
        .from('dogs')
        .insert([{
          nombre,
          chip_id: chipId,
          fecha_nacimiento: fechaNacimiento || null,
          contacto,
          instagram,
          facebook,
          tiktok,
          whatsapp,
          otro_link: otroLink,
          foto_url,
            owner_id: user?.id 
        }])
console.log('ERROR:', error)
console.log('insert error:', insertError)
//console.log('FOTO FILE:', fotoFile)
      if (insertError) throw insertError

      setNombre('')
      setChipId('')
      setFechaNacimiento('')
      setContacto('')
      setInstagram('')
      setFacebook('')
      setTiktok('')
      setWhatsapp('')
      setOtroLink('')
      setFotoFile(null)
      setPreview(null)
      if (onAdded) onAdded()
      alert('Perro registrado exitosamente 🐶')
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
    }
    setSubiendo(false)
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-4"
      >
        <h2 className="text-2xl font-extrabold text-orange-600 text-center mb-2">
          Registrar nuevo perro
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Previsualización de foto */}
        <div className="flex flex-col items-center space-y-2 mb-2">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 rounded-xl object-cover border border-orange-400 shadow"
            />
          ) : (
            <div className="w-24 h-24 rounded-xl bg-orange-100 flex items-center justify-center text-orange-400 text-2xl shadow">
              🐶
            </div>
          )}
          <label className="cursor-pointer text-orange-500 hover:underline text-sm">
            {preview ? 'Cambiar foto' : 'Agregar foto'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
          </label>
        </div>

        <input
          type="text"
          placeholder="Nombre"
          className="max-w-[300px] w-full mx-auto px-4 py-5 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Chip ID (opcional)"
          className="max-w-[300px] w-full mx-auto px-4 py-5 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
          value={chipId}
          onChange={e => setChipId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          className="max-w-[300px] w-full mx-auto px-4 py-5 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
          value={fechaNacimiento}
          onChange={e => setFechaNacimiento(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contacto (teléfono, email)"
          className="max-w-[300px] w-full mx-auto px-4 py-5 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
          value={contacto}
          onChange={e => setContacto(e.target.value)}
        />

        {/* Redes sociales: en columna */}
        <div className="flex flex-col gap-3 pt-2 w-full">
          <input
            type="text"
            placeholder="Instagram"
            className="max-w-[300px] w-full mx-auto px-4 py-4 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
            value={instagram}
            onChange={e => setInstagram(e.target.value)}
          />
          <input
            type="text"
            placeholder="Facebook"
            className="max-w-[300px] w-full mx-auto px-4 py-4 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
            value={facebook}
            onChange={e => setFacebook(e.target.value)}
          />
          <input
            type="text"
            placeholder="TikTok"
            className="max-w-[300px] w-full mx-auto px-4 py-4 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
            value={tiktok}
            onChange={e => setTiktok(e.target.value)}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            className="max-w-[300px] w-full mx-auto px-4 py-4 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <input
            type="text"
            placeholder="Otra red o link"
            className="max-w-[300px] w-full mx-auto px-4 py-4 text-lg border-2 border-orange-100 rounded-xl bg-gray-50 focus:border-orange-400 outline-none transition"
            value={otroLink}
            onChange={e => setOtroLink(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full max-w-[300px] mx-auto bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-xl font-bold mt-4 shadow transition"
          disabled={subiendo}
        >
          {subiendo ? "Registrando..." : "Registrar perro"}
        </button>
      </form>
    </div>
  )
}
