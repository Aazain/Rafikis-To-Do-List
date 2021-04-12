const jwt = require ('jsonwebtoken')


export class tokenService{

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

    refreshAccessToken(refreshToken: string | undefined, currentUser: any){
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

}