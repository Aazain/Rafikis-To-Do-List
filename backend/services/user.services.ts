import e, { request, response } from "express"
import { Users } from "../models/users.model"
import { passwordService } from "./password"
const bcrypt = require ('bcrypt')

export class userServices{
    email:string
    password: string

    constructor(email: string, password: string){
        this.email = email
        this.password = password
    }

    async createUser(){
        const checkEmail: object = await Users.findOne({email: this.email})
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
        const currentUser = await Users.findOne({email: this.email})
        const passService = new passwordService(this.password ,currentUser)
        const loginAuth = await passService.userAuth();
        return loginAuth
    }
} 