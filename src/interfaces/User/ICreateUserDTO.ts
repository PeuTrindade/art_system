import { TUserStyles } from "../../types/User/TUserStyles"

export interface ICreateUserDTO {
    name: string
    email: string
    password: string
    age: number
    image: string | undefined
    style: TUserStyles
}