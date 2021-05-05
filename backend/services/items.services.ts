import e, { response } from "express";
import { QueryOptions } from "mongoose"
import { Items } from "../models/todo.model"

export enum ItemServiceStatus{
    UNABLE = "UNABLE", ERROR = "ItemServiceError", SUCCESS = "ItemServiceSuccess", FORBIDDEN = "Forbidden"
}

interface CurrentUserData{
    user: {_id: string, email: string}
    iat: number
    exp: number
}

interface ItemData{
    _id: string
    userId: string
    task:string
    status: boolean
    createdAt: string
    updatedAt: string
    __v: 0
}

export class ItemService{
    currentUser: CurrentUserData;

    constructor(currentUser: CurrentUserData){
        this.currentUser = currentUser
    }

    checkItemId(params: string){
        return Items.find({_id: params}, (err: Error)=>{
            if(err){
                return ItemServiceStatus.ERROR
            }
        })
    }

    getSingleItem(params: string){
        const id = params
        return Items.findOne({_id: id}, (err: Error, result: ItemData)=>{
            if(err || result == null){
                return ItemServiceStatus.UNABLE;
            }
            else if(this.currentUser.user._id !== result.userId){
                return ItemServiceStatus.ERROR
            }
            else{
                return result
            }
        }, {new: true});
    }
    
    getItemList(){
        return Items.find({userId: this.currentUser.user._id}, (err: Error, result: object)=>{
            if(err){
                return ItemServiceStatus.UNABLE;
            }
            else{
                return result
            }
        })
    }

    deleteItem(itemId: string){
        const ItemDeletePromise = new Promise(async(reject, resolve)=>{
            Items.findByIdAndRemove({_id: itemId, userId: this.currentUser.user._id}, {useFindAndModify: false}, (err: Error, result: any)=>{
                if(err){
                    reject(ItemServiceStatus.UNABLE)
                }
                else{
                    return ItemServiceStatus.SUCCESS
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    newTask(userId: string, task: string, status: boolean){
        const itemList = new Items({
            userId,
            task,
            status
        })
        itemList.save()
        .then(()=>{
            return ItemServiceStatus.SUCCESS
        })
        .catch((err: Error)=>{
            return ItemServiceStatus.UNABLE;
        })
    }

    updateTask(userId: string, itemId: string, task: string, status: boolean){
        const updatePromise = new Promise(async (resolve, reject)=>{
            if(userId !== this.currentUser.user._id){
                reject(ItemServiceStatus.FORBIDDEN)
            }
            else{
                await Items.findOneAndUpdate({
                    userId,
                    _id: itemId
                }, {
                    $set:{
                        task,
                        status
                }},{
                    useFindAndModify: false
                },(err: Error)=>{
                    if(err){
                        reject(ItemServiceStatus.ERROR)
                    }
                    else{
                        resolve(ItemServiceStatus.SUCCESS)
                    }
                })
            }
        })
        .catch(err =>{
            if(err == "ItemServiceError"){
                return ItemServiceStatus.ERROR
            }
            else if(err == "Forbidden"){
                return ItemServiceStatus.FORBIDDEN
            }
        })
        return updatePromise
    }


}