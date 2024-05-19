import { TStyles } from "../../types/User/TStyles"

export interface ICreateUserDTO {
    name: string
    email: string
    password: string
    age: number
    image?: string
    style: TStyles
}