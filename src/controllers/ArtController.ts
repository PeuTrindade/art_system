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
}

export default new ArtController()