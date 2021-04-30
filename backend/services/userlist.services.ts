import { Users } from "../models/users.model";
import { User } from "./password.services"

export class userList{
    static getUserList() {
        throw new Error("Method not implemented.");
    }

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



