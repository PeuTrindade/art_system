import express from "express"
import ArtController from "../controllers/ArtController"

const artRoutes = express.Router()

artRoutes.post('/', ArtController.create)

export { artRoutes } 
