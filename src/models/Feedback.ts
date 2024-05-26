import connection from "../database";
import { ICreateFeedbackDTO } from "../interfaces/Feedback/ICreateFeedbackDTO";
import { IFeedback } from "../interfaces/Feedback/IFeedback";

class Feedback {
    async list(id: string): Promise<IFeedback[] | null> {
        try {
            const feedbacks = await connection.select('*').from('feedbacks').where({ artId: id })

            if (feedbacks) {
                return feedbacks
            }

            return null
        } catch (error) {
            return null
        }
    }

    async create({ artId, feedback, userId }: ICreateFeedbackDTO): Promise<boolean> {
        try {
           const isSuccess = await connection.insert({ artId, userId, feedback }).table('feedbacks') 

           if (isSuccess) return true

           return false
        } catch (error) {
            return false
        }
    }
}

export default new Feedback()