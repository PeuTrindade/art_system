import { Request, Response } from "express";
import User from "../models/User";
import { verifyIsDigit } from "../../utils/verifyIsDigit";

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password, age, image, style } = req.body
            const verifyUserAlreadyExists = await User.findByEmail(email)

            if (!name) {
                res.status(400)
                res.json({ message: 'Field name is required!' })

                return
            } else if (!email) {
                res.status(400)
                res.json({ message: 'Field email is required!' })

                return
            } else if (!password) {
                res.status(400)
                res.json({ message: 'Field password is required!' })

                return
            } else if (!age) {
                res.status(400)
                res.json({ message: 'Field age is required!' })

                return
            } else if (!style || (style !== 'painting' && style !== 'sculpture' && style !== 'design' && style !== 'photography')) {
                res.status(400)
                res.json({ message: 'Field style is empty or has unacceptable type' })

                return
            } else if (verifyUserAlreadyExists) {
                res.status(400)
                res.json({ message: 'Email already exists!' })

                return
            } else {
                await User.create({ age, email, name, password, style, image })

                res.status(201)
                res.json({ message: 'User created successfully!' })

                return
            }
        } catch (error) {
            res.status(400)
            res.json({ message: 'An error has occurred!', error })

            return
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (id) {
                if (verifyIsDigit(id)) {
                    const user = await User.findById(+id)

                    if (user) {
                        res.status(200)
                        res.json({ message: 'User found successfully!', user })

                        return
                    } else {
                        res.status(400)
                        res.json({ message: 'User not found!' })

                        return
                    }
                } else {
                    res.status(400)
                    res.json({ message: 'Invalid ID!' })

                    return
                }
            }
        } catch (error) {
            res.status(400)
            res.json({ message: 'An error has occurred!', error })

            return
        }
    }
}

export default new UserController()