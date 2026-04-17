import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 10

class UserController {
    // POST /cadastro
    async cadastro(req, res) {
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
            return res.status(500).json({ message: 'Erro ao cadastrar usuário.' })
        }
    }

    // POST /login
    async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })

            const senhaCorreta = await bcrypt.compare(password, user.password)
            if (!senhaCorreta) return res.status(401).json({ message: 'Senha incorreta.' })

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' })
            return res.status(200).json({ token })
        } catch (err) {
            return res.status(500).json({ message: 'Erro no servidor.' })
        }
    }

    // PUT /recuperar-senha
    async recuperarSenha(req, res) {
        const { email, password, respostaSeguranca } = req.body
        try {
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })

            if (respostaSeguranca.toLowerCase() !== user.respostaSeguranca.toLowerCase()) {
                return res.status(401).json({ message: 'Resposta de segurança incorreta.' })
            }

            const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
            await prisma.user.update({
                where: { email },
                data: { password: hashPassword }
            })
            return res.status(200).json({ message: 'Senha alterada com sucesso.' })
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao recuperar senha.' })
        }
    }

    // GET /listar-usuarios
    async listarUsuarios(req, res) {
        try {
            const users = await prisma.user.findMany({
                select: { id: true, name: true, email: true } 
            })
            return res.status(200).json({ message: 'Usuarios Listados com sucesso', users })
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao listar usuários.' })
        }
    }

    // DELETE /user/:id
    async deletarUsuario(req, res) {
        const { id } = req.params
        try {
            await prisma.user.delete({ where: { id } })
            return res.status(200).json({ message: 'Usuário deletado com sucesso.' })
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao deletar usuário.' })
        }
    }
}

export default new UserController()