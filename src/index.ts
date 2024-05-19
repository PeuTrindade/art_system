import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/User.routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', userRoutes)

app.listen(3000, () => {
    console.log('Server is running!')
})