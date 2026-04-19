import { Link } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/api'
import Input from '../../components/Input'
import '../../styles/styles.css'

function Cadastro() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const respostaRef = useRef()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await api.post('/cadastro', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        respostaSeguranca: respostaRef.current.value
      })
      alert("Usuário cadastrado com sucesso!")
    } catch (err) {
      alert("Erro ao cadastrar")
    }
  }

  return (
    
    <div className='container-cadastro'>
      <h2 className='mx-auto text-3xl font-extrabold mb-6 text-gray-800'>Cadastro</h2>

      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
      
        <Input ref={nameRef} placeholder='Nome' type='text' />
        <Input ref={emailRef} placeholder='Email' type='email' />
        <Input ref={respostaRef} placeholder='Qual nome do seu primeiro pet?' type='text' />
        <Input ref={passwordRef} placeholder='Senha' type='password' />

        <button
          type='submit'
          className='w-full mt-2 font-bold bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all'
        >
          Cadastrar
        </button>
      </form>

      <Link to='/login' className='link-login'>
        Já tem uma conta? Faça Login
      </Link>
    </div>
  )
}

export default Cadastro