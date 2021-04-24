import { Users } from "../models/users.model";
import { User } from "./password.services"

export class userList{

    async getUserList(){
        const allUsers = await Users.find({}, (err: Error, result: Array<User>)=>{
            if(err){
                return null
            }
            else{
                return result
            }
        })
        return allUsers
    }

}



