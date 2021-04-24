import { QueryOptions } from "mongoose"
import { Items } from "../models/todo.model"

interface CurrentUserData{
    user: {_id: string, email: string}
    iat: number
    exp: number
}

interface fjsaofa extends QueryOptions{
    err: Error
}

export class ItemServices{
    currentUser: CurrentUserData

    constructor(currentUser: CurrentUserData){
        this.currentUser = currentUser
    }

    getItemList(){
        return Items.find({userId: this.currentUser.user._id}, (err: Error, result: object)=>{
            if(err){
                return "unable to get Items"
            }
            else{
                return result
            }
        })
    }

    deleteItem(itemId: string){
        Items.findOneAndDelete({_id: itemId, userId: this.currentUser.user._id})

    }


}