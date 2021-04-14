import { NextFunction } from "express"

const jwt = require ('jsonwebtoken')

interface userInfo{
    _id: string
    email: string
}

export class tokenService{

    createAccessToken (currentUser: userInfo){
        return jwt.sign({ user: currentUser }, process.env.ACCESSTOKEN, {
            expiresIn: "259200"
        })
    }

    createRefreshToken (currentUser: userInfo){
        return jwt.sign({user: currentUser}, process.env.REFRESHTOKEN,{
            expiresIn: "604800s"
        })
    }

    refreshAccessToken(refreshToken: string | undefined, currentUser: userInfo){
        if(!refreshToken){return "Error"}
        const newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err: Error, token: string)=>{
            if(err){
                return err
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
                return "Forbidden"
            }
            else{
                return user
            }
        })
        return authenticateToken
    }


}