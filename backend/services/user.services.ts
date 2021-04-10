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
        const hashedPassword = await bcrypt.hash(this.password, 10)
        const userList = new Users({
            email: this.email,
            password: hashedPassword
        })
        userList.save();
        return response.status(201).send("Successfully created user")
    }

    signUpUser(){
        Users.findOne({email: this.email},(res: Response, userData: string) =>{
            if(userData !== null){
                return response.status(409).send("A user with this email already exists")
            }
            else{
                this.createUser();
            }
        })
    }

} 