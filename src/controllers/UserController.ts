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

        if (modelResponse.isOk) {
            res.status(201)
            res.json({ message: "User created successfully!"})
        } else {
            res.status(500)
            res.json({ message: modelResponse.message })
        }
    }
}

export default new UserController()