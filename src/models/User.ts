import { ICreateUserDTO } from "../interfaces/User/ICreateUserDTO"
import { hash } from 'bcrypt'
import { TUserResponse } from "../types/TResponse"
import connection from "../database"
import { IUser } from "../interfaces/User/IUser"
import { IUpdateUserDTO } from "../interfaces/User/IUpdateUserDTO"

class User {
    async create({ name, email, password, age ,style, image }: ICreateUserDTO): Promise<boolean> {
        try {
            const hashPassword = await hash(password, 10)

            await connection.insert({ name, email, password: hashPassword, age, style, image }).table('users')
        
            return true
        } catch (error) {
            false
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

    async getByEmail(email: string): Promise<IUser | null> {
        try {
            const users = await connection.select('*').from('users').where({ email })
            const user = users[0]

            if (users.length > 0) {
                return user
            }

            return null
        } catch (error) {
            return null
        }
    }

    async update({ id, age, name, password, style }: IUpdateUserDTO): Promise<boolean> {
        try {
            const hashPassword = await hash(password, 10)
            const isSuccess = await connection.update({ age, name, password: hashPassword, style }).where({ id }).table('users')

            if (isSuccess) {
                return true
            }

            return false
        } catch (error) {
            return false
        }
    }
}

export default new User()