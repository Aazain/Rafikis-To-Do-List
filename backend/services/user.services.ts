import { Users } from "../models/users.model"
import { PasswordService } from "./password.services"
const bcrypt = require ('bcrypt')

export class UserServices{
    email:string
    password: string

    constructor(email: string, password: string){
        this.email = email
        this.password = password
    }

    async createUser(){
        const checkEmail: object = await this.findUser();
        if(checkEmail !== null){
            return "a user with this email already exists"
        }
        else{
            const hashedPassword = await bcrypt.hash(this.password, 10)
            const userList = new Users({
                email: this.email,
                password: hashedPassword
            })
            userList.save();
            return "successfully created user"
        }
    }

    async userLogin(){
        const currentUser = await this.findUser();
        const passService = new PasswordService(this.password ,currentUser)
        const loginAuth = await passService.userAuth();
        return loginAuth
    }

    async findUser(){
        const currentUser = await Users.findOne({email: this.email})
        return currentUser
    }
} 