import { ICreateUserDTO } from "../interfaces/Users/ICreateUserDTO";
import connection from '../database'
import bcrypt from 'bcrypt'

class User {
    async create({ age, email, name, password, style, image }: ICreateUserDTO) {
        try {
            const hashPassword = await bcrypt.hash(password, 10)

            await connection.insert({ age, email, name, password: hashPassword, style, image }).table('users') 
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await connection.select('*').from('users').where({ email })

            if (user.length > 0) {
                return true
            }

            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async findById(id: number) {
        try {
            const user = await connection.select('*').from('users').where({ id }).first()

            if (user) return user

            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default new User()