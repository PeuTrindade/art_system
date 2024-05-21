import { Request, Response } from "express"
import Art from "../models/Art"

class ArtController {
    async create(req: Request, res: Response) {
        const { name, image, valuedAt, userId } = req.body

        if (!name || !valuedAt || !userId ) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await Art.create({ name, image, valuedAt, userId })

        if (modelResponse) {
            res.status(201)
            res.json({ message: "Art created successfully!"})
        } else {
            res.status(500)
            res.json({ message: "Art creation failed!" })
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params

        const art = await Art.getById(id)

        if (!art) {
            res.status(400)
            res.json({ message: "Art was not found!"})

            return
        }

        res.status(200)
        res.json({ message: "Art found successfully!", art })
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { image, name, valuedAt } = req.body

        if (!name || !valuedAt) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await Art.update({ id, image, name, valuedAt })

        if (modelResponse) {
            res.status(200)
            res.json({ message: "Art info was updated successfully!"})
        } else {
            res.status(400)
            res.json({ message: "Art update failed!" })
        }
    }
}

export default new ArtController()