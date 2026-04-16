import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

function ListarUsers() {
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const token = localStorage.getItem('token')
    try {
      const { data: { users } } = await api.get('/listar-usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAllUsers(users)
    } catch (err) {
      console.error('[loadUsers]', err)
    }
  }

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Deseja excluir esse usuário?')
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem('token')
      await api.delete(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setAllUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      console.error('[deleteUser]', err)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const getInitials = (name) => {
  if (!name) return ''
  const parts = name.split(' ')
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0][0].toUpperCase()
}

return (
  <div className='flex flex-col items-start mx-auto mt-20 bg-white p-8 border border-t-8 border-gray-300 border-t-green-500 rounded-t-lg rounded-lg shadow-lg max-w-md w-full'>
    <h2 className='mx-auto text-3xl font-extrabold mb-6 text-gray-800'>Lista de Usuários</h2>

    {allUsers.length === 0 && (
      <p className='w-full text-center text-gray-500 my-10 italic'>
        Nenhum usuário cadastrado no momento.
      </p>
    )}

    <ul className='w-full space-y-4 mb-6'>
      {allUsers.map(user => (
        <li
          key={user.id}
          className='flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md'
        >
          <div className='flex items-center gap-4'>
            
            <div className='flex items-center justify-center w-12 h-12 bg-purple-600 text-white font-bold rounded-full shrink-0 shadow-sm'>
              {getInitials(user.name)}
            </div>

            <div className='flex flex-col'>
              <p className='text-xs font-mono text-gray-400'>#{user.id.slice(-5)}</p>
              <p className='text-md font-bold text-gray-900 leading-tight'>{user.name}</p>
              <p className='text-xs text-gray-600'>{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => deleteUser(user.id)}
            className='bg-red-500 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700 transition-all text-xs'
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>

    
    <button
      onClick={logout}
      className='w-full mt-2 font-bold bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all'
    >
      Sair da Conta
    </button>

    <Link
      to='/cadastro'
      className='mx-auto mt-4 text-sm font-semibold text-green-600 underline hover:text-green-800 transition-all'
    >
      Cadastrar novo usuário.
    </Link>
  </div>
)
}

export default ListarUsers