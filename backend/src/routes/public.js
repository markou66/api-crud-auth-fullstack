import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/cadastro', UserController.cadastro)
router.post('/login', UserController.login)
router.put('/recuperar-senha', UserController.recuperarSenha)

export default router