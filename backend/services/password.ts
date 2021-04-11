import { Users } from "../models/users.model"
import { userServices } from "./user.services"
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
require("dotenv/config")

interface user{
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
            const newToken = this.createAccessToken({_id: this.currentUser._id, email: this.currentUser.email})
            const refreshToken = this.createRefreshToken({_id: this.currentUser._id, email: this.currentUser.email})
            return {accessToken: newToken, refreshToken: refreshToken}
        }
    }

    createAccessToken (currentUser: any){
        return jwt.sign({ user: currentUser }, process.env.ACCESSTOKEN, {
            expiresIn: "10s"
        })
    }

    createRefreshToken (currentUser: any){
        return jwt.sign({user: currentUser}, process.env.REFRESHTOKEN,{
            expiresIn: "20s"
        })
    }
    
}