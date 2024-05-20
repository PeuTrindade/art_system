import express from "express"
import UserController from "../controllers/UserController"

const userRoutes = express.Router()

userRoutes.post('/', UserController.create)
userRoutes.get('/:email', UserController.getByEmail)

export { userRoutes } 
