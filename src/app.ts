import express from 'express'
import { usersRouter } from './routes/users'
import { emailRouter } from './routes/email'

export const app = express()

const jsonBodyParser = express.json()


app.use(jsonBodyParser)
app.use('/login', emailRouter)
app.use('/users', usersRouter)
