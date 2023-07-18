import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { version } from '../package.json'

if (String(process.env.NODE_ENV).trim() === 'test') {
  dotenv.config({ path: '.env.test' })
} else dotenv.config()

console.info('Starting server...')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors())

const router = express.Router()

router.get('/version', async (req, res) => {
  try {
    return res.send({ version })
  } catch (error) {
    res.status(400).send({ error: 'Internal Error' })
  }
})

app.use('/', router)

export default app