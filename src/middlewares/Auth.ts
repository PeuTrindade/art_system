import { NextFunction, Response } from "express";
import { Request } from "supertest";
import jwt from 'jsonwebtoken'

export default function Auth(req: Request, res: Response, next: NextFunction) {
    const authToken = (req as any).headers['authorization']

    if (authToken) {
        const bearer = authToken.split(' ')
        const token = bearer[1]

        const decoded = jwt.verify(token, 'jfbfuwfnfaubfefiwmmmaiaue2344wiwiw')

        if (decoded) {     
            next()
        } else {
            res.status(403)
            res.json({ message: "Invalid token!"})

            return
        }
    } else {
        res.status(403)
        res.json({ message: "You are not authenticated!"})

        return
    }
}