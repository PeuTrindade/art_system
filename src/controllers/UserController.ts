import { Request, Response } from "express"
import User from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password, age, style } = req.body
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
        
        const modelResponse = await User.create({ age, email, name, password, style })

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

    async auth(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await User.getByEmail(email)

        if (!user) {
            res.status(400)
            res.json({ message: "User does not exists!"})

            return
        } else {
            const comparePasswords = await bcrypt.compare(password, user.password)

            if (comparePasswords) {
                const token = jwt.sign({ email: user.email }, 'jfbfuwfnfaubfefiwmmmaiaue2344wiwiw')

                res.status(200)
                res.json({ message: "Auth succeeded!", token, user: { email: user.email, name: user.name, age: user.age, style: user.style, id: user.id } })
            } else {
                res.status(406)
                res.json({ message: "Invalid email or password!"})

                return
            }
        }
    }

    async updateImage(req: Request, res: Response) {
        const { id } = req.params
        const image = req.file.path

        if (!image) {
            res.status(400)
            res.json({ message: "Fields missing! Please send valid data."})

            return
        }

        const modelResponse = await User.updateImage(id, image)

        if (modelResponse) {
            res.status(200)
            res.json({ message: "User image was updated successfully!"})
        } else {
            res.status(400)
            res.json({ message: "User image update failed!" })
        }
    }

    async list(req: Request, res: Response) {
        const users = await User.list()

        if (!users) {
            res.status(400)
            res.json({ message: "Users list failed!"})

            return
        }

        res.status(200)
        res.json({ users })
    }
}

export default new UserController()