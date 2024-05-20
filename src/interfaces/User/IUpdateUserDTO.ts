import { TUserStyles } from "../../types/User/TUserStyles"

export interface IUpdateUserDTO {
    id: string
    name: string
    password: string
    age: number
    style: TUserStyles
}