import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 10

// POST /cadastro
router.post('/cadastro', async (req, res) => {
  const { email, name, password, respostaSeguranca } = req.body

  if (!email || !name || !password || !respostaSeguranca) {
    return res.status(400).json({ message: 'Preencha todos os campos.' })
  }

  try {
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: { email, name, password: hashPassword, respostaSeguranca }
    })

    return res.status(201).json(user)
  } catch (err) {
    console.error('[cadastro]', err)
    return res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
  }
})

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    const senhaCorreta = await bcrypt.compare(password, user.password)

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })

    return res.status(200).json({ token })
  } catch (err) {
    console.error('[login]', err)
    return res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
  }
})

// PUT /recuperar-senha
router.put('/recuperar-senha', async (req, res) => {
  const { email, password, respostaSeguranca } = req.body

  if (!email || !password || !respostaSeguranca) {
    return res.status(400).json({ message: 'Preencha todos os campos para recuperar a senha.' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    const respostaCorreta =
      respostaSeguranca.toLowerCase() === user.respostaSeguranca.toLowerCase()

    if (!respostaCorreta) {
      return res.status(401).json({ message: 'Resposta de segurança incorreta.' })
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)

    await prisma.user.update({
      where: { email },
      data: { password: hashPassword }
    })

    return res.status(200).json({ message: 'Senha alterada com sucesso.' })
  } catch (err) {
    console.error('[recuperarSenha]', err)
    return res.status(500).json({ message: 'Erro no servidor, tente novamente.' })
  }
})

export default router