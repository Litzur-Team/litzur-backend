import app from './app.js'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config.js'
import 'dotenv/config'

const PORT = process.env.PORT

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
