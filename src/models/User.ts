import { ICreateUserDTO } from "../interfaces/User/ICreateUserDTO"
import { hash } from 'bcrypt'
import { TUserResponse } from "../types/TResponse"
import connection from "../database"

class User {
    async create({ name, email, password, age ,style, image }: ICreateUserDTO): Promise<TUserResponse> {
        try {
            const hashPassword = await hash(password, 10)

            await connection.insert({ name, email, password: hashPassword, age, style, image }).table('users')
        
            return { isOk: true }
        } catch (error) {
            return { isOk: false, message: error }
        }
    }

    async findByEmail(email: string): Promise<boolean> {
        try {
            const users = await connection.select('*').from('users').where({ email })

            if (users.length > 0) {
                return true
            }

            return false
        } catch (error) {
            return false
        }
    }
}

export default new User()