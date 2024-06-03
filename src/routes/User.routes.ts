import express from "express"
import UserController from "../controllers/UserController"
import Auth from "../middlewares/Auth"
import multer from "multer"
import storage from "../middlewares/Upload"

const userRoutes = express.Router()
const upload = multer({ storage: storage })

userRoutes.post('/', UserController.create)
userRoutes.get('/:email', UserController.getByEmail)
userRoutes.put('/:id', Auth as any, UserController.update)
userRoutes.post('/auth', UserController.auth)
userRoutes.get('/', Auth as any, UserController.list)
userRoutes.patch('/image/:id', Auth as any, upload.single('image'), UserController.updateImage)

export { userRoutes }
