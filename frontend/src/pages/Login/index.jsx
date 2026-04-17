import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Input from '../../components/Input'
import '../../styles/styles.css'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email || !password) {
      return alert('Por favor, preencha todos os campos antes de entrar.')
    }

    try {
      const { data: token } = await api.post('/login', { email, password })
      
      localStorage.setItem('token', token.token)
      navigate('/listarUsers')
    } catch (err) {
      console.error('[handleSubmitLogin]', err)
      alert('Usuário ou senha inválidos.')
    }
  }

  return (
    <div className='container-cadastro'>
      <h2 className='mx-auto text-3xl font-extrabold mb-6 text-gray-800'>Login</h2>

      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <Input
          ref={emailRef}
          placeholder='Email'
          type='email'
        />

        <Input
          ref={passwordRef}
          placeholder='Senha'
          type='password'
        />

        <button
          type='submit'
          className='w-full mt-2 font-bold bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all'
        >
          Entrar
        </button>
      </form>

      <Link to='/cadastro' className='link-login'>
        Não tem conta? Cadastre-se.
      </Link>

      <Link to='/recuperar-senha' className='link-login'>
        Esqueceu a senha? Recuperar.
      </Link>
    </div>
  )
}

export default Login