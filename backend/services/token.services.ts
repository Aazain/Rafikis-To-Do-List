import { NextFunction } from "express"

const jwt = require ('jsonwebtoken')

interface UserInfo{
    _id: string
    email: string
}

export class TokenService{

    createAccessToken (currentUser: UserInfo){
        return jwt.sign({ user: currentUser }, process.env.ACCESSTOKEN, {
            expiresIn: "259200s"
        })
    }

    createRefreshToken (currentUser: UserInfo){
        return jwt.sign({user: currentUser}, process.env.REFRESHTOKEN,{
            expiresIn: "604800s"
        })
    }

    refreshAccessToken(refreshToken: string | undefined, currentUser: UserInfo){
        if(!refreshToken){return "Error"}
        const newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err: Error, token: string)=>{
            if(err){
                return "invalid token"
            }
            else{
                const createNewToken = this.createAccessToken(currentUser)
                return {accessToken: createNewToken}
            }
        })
        return newToken
    }

    tokenAuth(accessToken: string | undefined){
        const authenticateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN, (err: Error, user: string)=>{
            if(err){
                console.log(err)
                return "forbidden"
            }
            else{
                return user
            }
        })
        return authenticateToken
    }


}