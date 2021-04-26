import { QueryOptions } from "mongoose"
import { Items } from "../models/todo.model"

interface CurrentUserData{
    user: {_id: string, email: string}
    iat: number
    exp: number
}

export class ItemServices{
    currentUser: CurrentUserData

    constructor(currentUser: CurrentUserData){
        this.currentUser = currentUser
    }

    checkItemId(params: string){
        return Items.find({_id: params})
    }

    getSingleItem(params: string){
        const id = params
        return Items.findById(id, (err: Error, result: object)=>{
            if(err || result == null){
                return("unable to find item")
            }
            else{
                return result
            }
        })

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
        return Items.findByIdAndRemove({_id: itemId, userId: this.currentUser.user._id}, {useFindAndModify: false}, (err: Error, result: any)=>{
            if(err || !result){
                return "unable to delete task"
            }
            else{
                return "successfully deleted task"
            }
        })

    }


}