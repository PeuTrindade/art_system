import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.post('/', UserController.create)
router.get('/:id', UserController.findById)

export default router