import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

function Cadastro() {
  const nameRef = useRef()
  const emailRef = useRef()
  const respostaRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    
    try {
      await api.post('/cadastro', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        respostaSeguranca: respostaRef.current.value,
        password: passwordRef.current.value
      })

      alert('Usuário cadastrado com sucesso!')
      navigate('/login')
    } catch (err) {
      console.error('[handleSubmitCadastro]', err)
      const mensagemErro = err.response?.data?.message || 'Erro ao cadastrar'
      alert(mensagemErro)
    }
  }

  return (
    <div className='flex flex-col items-start mx-auto mt-20 bg-white p-8 border border-t-8 border-t-green-500 border-gray-300 rounded-t-lg rounded-lg shadow-lg max-w-md w-full'>
      <h2 className='mx-auto text-3xl font-extrabold mb-6 text-gray-800'>Cadastro</h2>

      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          placeholder='Nome'
          type='text'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <input
          ref={emailRef}
          placeholder='Email'
          type='email'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <input
          ref={respostaRef}
          placeholder='Qual era o nome do seu primeiro pet?'
          type='text'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <input
          ref={passwordRef}
          placeholder='Senha'
          type='password'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <button
          type='submit'
          className='w-full mt-2 font-bold bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all'
        >
          Cadastrar
        </button>
      </form>

      <Link
        to='/login'
        className='mt-4 text-sm font-semibold text-green-600 underline hover:text-green-800 transition-all'
      >
        Já tem uma conta? Faça Login
      </Link>
    </div>
  )
}

export default Cadastro