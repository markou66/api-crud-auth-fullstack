import express from 'express'
import cors from 'cors'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'

const app = express()

app.use(express.json())
app.use(cors())

// Rotas
app.use('/api', publicRoutes)
app.use('/api', auth, privateRoutes)

const PORT = process.env.PORT || 2000

app.listen(PORT, () => {
  console.log(`[servidor] Rodando com sucesso na porta ${PORT}`)
})