import connection from "../database";
import { IArt } from "../interfaces/Art/IArt";
import { ICreateArtDTO } from "../interfaces/Art/ICreateArtDTO";
import { IUpdateArt } from "../interfaces/Art/IUpdateArtDTO";

class Art {
    async create({ name, userId, valuedAt }: ICreateArtDTO): Promise<boolean> {
        try {
            await connection.insert({ name, userId, valuedAt, createdAt: new Date() }).table('arts')

            return true
        } catch (error) {
            return false
        }
    }

    async getById(id: string): Promise<IArt | null> {
        try {
            const art = await connection.where({ id }).first().table('arts')

            if (art) {
                return art
            }

            return null
        } catch (error) {
            return null
        }
    }

    async update({ id, image, name, valuedAt }: IUpdateArt): Promise<boolean> {
        try {
            const isSuccess = await connection.update({ image, name, valuedAt }).where({ id }).table('arts')

            if (isSuccess) {
                return true
            }

            return false
        } catch (error) {
            return false
        }
    }

    async list(): Promise<IArt[] | null> {
        try {
            const arts = await connection.select('*').from('arts')

            return arts
        } catch (error) {
            return null
        }
    }

    async listFromUser(id: string): Promise<IArt[] | null> {
        try {
            const arts = await connection.select('*').where({ userId: id }).from('arts')

            return arts
        } catch (error) {
            return null
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const isSuccess = await connection.delete().where({ id }).table('arts')

            if (isSuccess) return true

            return false
        } catch (error) {
            return false
        }
    }

    async updateImage(id: string, image: string): Promise<boolean> {
        try {
            const isSuccess = await connection.update({ image }).where({ id }).table('arts')

            if (isSuccess) {
                return true
            }

            return false
        } catch (error) {
            return false
        }
    }
}

export default new Art()