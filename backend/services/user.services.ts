import e, { request, response } from "express"
import { Users } from "../models/users.model"

const bcrypt = require ('bcrypt')

export class userServices{
    email:string
    password: string

    constructor(email: string, password: string){
        this.email = email
        this.password = password
    }

    async createUser(){
        const hashedPassword = await bcrypt.hash(this.email, 10)
        const userList = new Users({
            email: this.email,
            password: hashedPassword
        })

        let checkEmail: object = Users.findOne({email: this.email})
        if(checkEmail !== null){
            return checkEmail
        }
        else{
            userList.save();
            return {message: "Successfully Created User"}
        }
    }
} 