import express from 'express'
import bodyParser from 'body-parser'
import { routes } from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

const port = 3000

app.listen(port, () => {
  return console.log(`Server is running on port ${port}!`)
})