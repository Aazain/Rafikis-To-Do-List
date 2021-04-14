import { Users } from "../models/users.model";
import { user } from "./password.services"

export class userList{

    async getUserList(){
        const allUsers = await Users.find({}, (err: Error, result: Array<user>)=>{
            if(err){
                return err
            }
            else{
                return result
            }
        })
        return allUsers
    }

}



