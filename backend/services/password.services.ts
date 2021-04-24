import { TokenService } from "./token.services"
const bcrypt = require ('bcrypt')
require("dotenv/config")

export interface User{
    _id: string
    email: string
    password: string
    __v: number
}

export class PasswordService{
    userPassword: string
    currentUser: User

    constructor(password: string ,currentUser: User){
        this.currentUser = currentUser
        this.userPassword = password
    }

    async userAuth(){
        const passwordAuth = await bcrypt.compare(this.userPassword, this.currentUser.password)
        if(!passwordAuth){
            return "incorrect email or password"
        }
        else{
            const token = new TokenService
            const newToken = token.createAccessToken({_id: this.currentUser._id, email: this.currentUser.email})
            const refreshToken = token.createRefreshToken({_id: this.currentUser._id, email: this.currentUser.email})
            return {accessToken: newToken, refreshToken: refreshToken}
        }
    }
}