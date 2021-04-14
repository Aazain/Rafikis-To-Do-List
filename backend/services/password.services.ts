import { Users } from "../models/users.model"
import { userServices } from "./user.services"
import { tokenService } from "./token.services"
const bcrypt = require ('bcrypt')
require("dotenv/config")

export interface user{
    _id: string
    email: string
    password: string
    __v: number
}

export class passwordService{
    userPassword: string
    currentUser: user

    constructor(password: string ,currentUser: user){
        this.currentUser = currentUser
        this.userPassword = password
    }

    async userAuth(){
        const passwordAuth = await bcrypt.compare(this.userPassword, this.currentUser.password)
        if(!passwordAuth){
            return "incorrect email or password"
        }
        else{
            const token = new tokenService
            const newToken = token.createAccessToken({_id: this.currentUser._id, email: this.currentUser.email})
            const refreshToken = token.createRefreshToken({_id: this.currentUser._id, email: this.currentUser.email})
            return {accessToken: newToken, refreshToken: refreshToken}
        }
    }
}