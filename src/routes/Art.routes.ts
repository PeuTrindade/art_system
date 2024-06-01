import express from "express"
import ArtController from "../controllers/ArtController"
import Auth from "../middlewares/Auth"

const artRoutes = express.Router()

artRoutes.post('/', Auth as any, ArtController.create)
artRoutes.get('/:id', Auth as any, ArtController.getById)
artRoutes.put('/:id', Auth as any, ArtController.update)
artRoutes.get('/', Auth as any, ArtController.list)
artRoutes.delete('/:id', Auth as any, ArtController.delete)

export { artRoutes } 
