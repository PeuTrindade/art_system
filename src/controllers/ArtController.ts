import { Request, Response } from "express"
import Art from "../models/Art"

class ArtController {
    async create(req: Request, res: Response) {
        const { name, valuedAt, userId } = req.body

        if (!name || !valuedAt || !userId ) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await Art.create({ name, valuedAt, userId })

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

    async list(req: Request, res: Response) {
        const arts = await Art.list()

        if (!arts) {
            res.status(400)
            res.json({ message: "Arts list failed!"})

            return
        }

        res.status(200)
        res.json({ arts })
    }

    async listFromUser(req: Request, res: Response) {
        const { id } = req.params
        const arts = await Art.listFromUser(id)

        if (!arts) {
            res.status(400)
            res.json({ message: "Arts list failed!"})

            return
        }

        res.status(200)
        res.json({ arts })
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const isSuccessDeleted = await Art.delete(id)

        if (!isSuccessDeleted) {
            res.status(400)
            res.json({ message: "Art delete failed!"})

            return
        }

        res.status(200)
        res.json({ message: "Art deleted successfully!"})
    }

    async updateImage(req: Request, res: Response) {
        const { id } = req.params
        const image = req.file.path

        if (!image) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await Art.updateImage(id, image)

        if (modelResponse) {
            res.status(200)
            res.json({ message: "Art image was updated successfully!"})
        } else {
            res.status(400)
            res.json({ message: "Art image update failed!" })
        }
    }
}

export default new ArtController()