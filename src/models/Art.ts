import connection from "../database";
import { ICreateArtDTO } from "../interfaces/Art/ICreateArtDTO";

class Art {
    async create({ image, name, userId, valuedAt }: ICreateArtDTO): Promise<boolean> {
        try {
            await connection.insert({ name, image, userId, valuedAt }).table('arts')

            return true
        } catch (error) {
            return false
        }
    }
}

export default new Art()