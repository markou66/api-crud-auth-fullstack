import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import ListarUsers from './pages/Lista'
import Recuperar from './pages/Recuperar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/listarUsers' element={<ListarUsers />} />
        <Route path='/recuperar-senha' element={<Recuperar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App