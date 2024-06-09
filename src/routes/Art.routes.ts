import express from "express"
import ArtController from "../controllers/ArtController"
import Auth from "../middlewares/Auth"
import multer from "multer"
import storage from "../middlewares/Upload"

const artRoutes = express.Router()
const upload = multer({ storage: storage, limits: {
    fileSize: 50 * 1024 * 1024
} })

artRoutes.post('/', Auth as any, ArtController.create)
artRoutes.get('/:id', Auth as any, ArtController.getById)
artRoutes.put('/:id', Auth as any, ArtController.update)
artRoutes.get('/', Auth as any, ArtController.list)
artRoutes.get('/user/:id', Auth as any, ArtController.listFromUser)
artRoutes.delete('/:id', Auth as any, ArtController.delete)
artRoutes.patch('/image/:id', Auth as any, upload.single('image'), ArtController.updateImage)

export { artRoutes } 
