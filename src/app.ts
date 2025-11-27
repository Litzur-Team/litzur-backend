import express, { Application } from 'express'
import routes from './api/routes/index.js'
import cors from 'cors'

const app: Application = express()

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

app.use(express.json())

app.use('/api', routes)

export default app
