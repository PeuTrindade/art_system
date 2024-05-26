import express from "express"
import ArtController from "../controllers/ArtController"

const artRoutes = express.Router()

artRoutes.post('/', ArtController.create)
artRoutes.get('/:id', ArtController.getById)
artRoutes.put('/:id', ArtController.update)
artRoutes.get('/', ArtController.list)
artRoutes.delete('/:id', ArtController.delete)

export { artRoutes } 
