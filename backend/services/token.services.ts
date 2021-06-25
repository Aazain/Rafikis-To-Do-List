import e from "express";

const jwt = require ('jsonwebtoken')

export enum TokenStatus{
    INVALID = "INVALID", ERROR = "TokenError"
}

interface UserInfo{
    _id: string
    email: string
}

export class TokenService{
    tokenServiceStatus!: TokenStatus;

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
        if(!currentUser){
            this.tokenServiceStatus = TokenStatus.INVALID
            return this.tokenServiceStatus
        }
        else{
            const newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err: Error, token: any)=>{
                if(!refreshToken){
                    this.tokenServiceStatus = TokenStatus.ERROR
                    return this.tokenServiceStatus
                }
                if(err){
                    this.tokenServiceStatus = TokenStatus.INVALID
                    return this.tokenServiceStatus
                }
                else if(token.user.email != currentUser.email || currentUser === null){
                    this.tokenServiceStatus = TokenStatus.INVALID
                    return this.tokenServiceStatus
                }
                else{
                    const createNewToken = this.createAccessToken(currentUser)
                    return {accessToken: createNewToken}
                }
            })
            return newToken
        }
    }

    tokenAuth(accessToken: string | undefined){
        const authenticateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN, (err: Error, user: string)=>{
            if(err){
                this.tokenServiceStatus = TokenStatus.ERROR
                return this.tokenServiceStatus
            }
            else{
                return user
            }
        })
        return authenticateToken
    }


}