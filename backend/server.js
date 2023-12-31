import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import {
    notFound, errorHandler
} from './middleware/errorMiddleware.js'

dotenv.config();
connectDB()

const PORT = process.env.PORT || 5000;

const app = express()

app.use(express.json({ limit: '10mb' })) // body parser
app.use(express.urlencoded({ extended: true })) // enabled form data
app.use(cookieParser())

app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Server is ready'))
}


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))