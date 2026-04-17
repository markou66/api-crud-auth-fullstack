import express from 'express'
import UserController from '../controllers/UserController.js'
import PostController from '../controllers/PostController.js' 

const router = express.Router()

router.get('/listar-usuarios', UserController.listarUsuarios)
router.delete('/user/:id', UserController.deletarUsuario)

router.post('/posts', PostController.criarPost)     
router.get('/posts', PostController.listarPosts)     
router.delete('/posts/:id', PostController.deletarPost) 

export default router