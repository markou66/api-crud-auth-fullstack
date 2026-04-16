import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

// GET /listar-usuarios
router.get('/listar-usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    return res.status(200).json({ message: 'Usuarios Listados com sucesso', users })
  } catch (err) {
    console.error('[listarUsuarios]', err)
    return res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
  }
})

// DELETE /user/:id
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    await prisma.user.delete({ where: { id } })

    return res.status(200).json({ message: 'Usuário deletado com sucesso.' })
  } catch (err) {
    console.error('[deletarUsuario]', err)
    return res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
  }
})

export default router