import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PostController {

  async criarPost(req, res) {
    const { title, content } = req.body


    const userId = req.userId

    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' })
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId
        }
      })

      return res.status(201).json(post)
    } catch (err) {
      console.error('[PostController.criarPost]', err)
      return res.status(500).json({ message: 'Erro ao criar post.' })
    }
  }

  async listarPosts(req, res) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      })

      return res.status(200).json(posts)
    } catch (err) {
      console.error('[PostController.listarPosts]', err)
      return res.status(500).json({ message: 'Erro ao listar posts.' })
    }
  }

  
  async deletarPost(req, res) {
    const { id } = req.params

    try {
      await prisma.post.delete({
        where: { id }
      })

      return res.status(200).json({ message: 'Post removido com sucesso.' })
    } catch (err) {
      console.error('[PostController.deletarPost]', err)
      return res.status(500).json({ message: 'Erro ao deletar post.' })
    }
  }
}

export default new PostController()