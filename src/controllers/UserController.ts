import { Request, Response } from "express"
import User from "../models/User"

class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password, age, style, image } = req.body
        const validStyles = ['design', 'photography', 'painting', 'sculpture']

        const userAlreadyExists = await User.findByEmail(email)

        if (!name || !email || !password || !age || !style || !validStyles.includes(style)) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        } else if (userAlreadyExists) {
            res.status(400)
            res.json({ message: "Email already exists. Please, try login!"})

            return
        }
        
        const modelResponse = await User.create({ age, email, image, name, password, style })

        if (modelResponse) {
            res.status(201)
            res.json({ message: "User created successfully!"})
        } else {
            res.status(500)
            res.json({ message: "User creation failed!" })
        }
    }

    async getByEmail(req: Request, res: Response) {
        const { email } = req.params

        const user = await User.getByEmail(email)

        if (!user) {
            res.status(400)
            res.json({ message: "User not found!"})

            return
        }

        res.status(200)
        res.json({ message: "User found successfully!", user})
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { age, name, password, style } = req.body

        if (!age || !name || !password || !style) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await User.update({ id, age, name, password, style })

        if (modelResponse) {
            res.status(200)
            res.json({ message: "User info was updated successfully!"})
        } else {
            res.status(400)
            res.json({ message: "User update failed!" })
        }
    }
}

export default new UserController()