import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

function Recuperar() {
  const emailRef = useRef()
  const respostaRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await api.put('/recuperar-senha', {
        email: emailRef.current.value,
        respostaSeguranca: respostaRef.current.value,
        password: passwordRef.current.value
      })

      alert('Senha alterada com sucesso!')

      emailRef.current.value = ''
      respostaRef.current.value = ''
      passwordRef.current.value = ''

      navigate('/login')
    } catch (err) {
      console.error('[handleSubmitRecuperar]', err)
      alert(err.response?.data?.message || 'Erro ao recuperar senha')
    }
  }

  return (
    <div className='flex flex-col items-start mx-auto mt-20 bg-white p-8 border border-t-8 border-t-green-500 border-gray-300 rounded-lg rounded-t-lg shadow-lg max-w-md w-full'>
      <h2 className='mx-auto text-3xl font-extrabold mb-6 text-gray-800'>Recuperar Senha</h2>

      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          placeholder='Email'
          type='email'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <input
          ref={respostaRef}
          placeholder='Qual nome do seu primeiro pet?'
          type='text'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <input
          ref={passwordRef}
          placeholder='Nova Senha'
          type='password'
          className='w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
        />

        <button
          type='submit'
          className='w-full mt-2 font-bold bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all'
        >
          Nova senha
        </button>

        <Link
          to='/login'
          className='mt-4 text-sm font-semibold text-green-600 underline hover:text-green-800 transition-all'
        >
          Retornar para Login.
        </Link>
      </form>
    </div>
  )
}

export default Recuperar