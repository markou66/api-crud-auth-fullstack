import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import Input from '../../components/Input'
import '../../styles/styles.css'

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
    <div className='container-cadastro'>
      <h2 className='mx-auto text-3xl font-extrabold mb-6 text-gray-800'>Recuperar Senha</h2>

      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <Input
          ref={emailRef}
          placeholder='Email'
          type='email'
        />

        <Input
          ref={respostaRef}
          placeholder='Qual nome do seu primeiro pet?'
          type='text'
        />

        <Input
          ref={passwordRef}
          placeholder='Nova Senha'
          type='password'
        />

        <button
          type='submit'
          className='w-full mt-2 font-bold bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all'
        >
          Nova senha
        </button>

        <Link to='/login' className='link-login'>
          Retornar para Login.
        </Link>
      </form>
    </div>
  )
}

export default Recuperar