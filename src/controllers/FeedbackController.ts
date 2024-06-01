import { Request, Response } from "express";
import Feedback from "../models/Feedback";

class FeedbackController {
    async create(req: Request, res: Response) {
        const { userId, artId, feedback } = req.body

        if (!userId || !artId || !feedback) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await Feedback.create({ artId, feedback, userId })

        if (modelResponse) {
            res.status(201)
            res.json({ message: "Feedback created successfully!"})
        } else {
            res.status(500)
            res.json({ message: "Feedback creation failed!" })
        }
    }

    async list(req: Request, res: Response) {
        const { id } = req.params

        const feedbacks = await Feedback.list(id)

        if (!feedbacks) {
            res.status(400)
            res.json({ message: "Feedbacks list failed!"})

            return
        }

        res.status(200)
        res.json({ feedbacks })
    }
}

export default new FeedbackController()