import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DogForm from "./pages/DogForm"
import VerPerro from './pages/VerPerro'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agregar-perro" element={<DogForm />} />
          <Route path="/ver-perro/:id" element={<VerPerro />} />
          
        {/* Aquí puedes agregar más rutas como /perfil, /historial, etc. */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
