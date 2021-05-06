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

    checkItemId(params: string = "fawfaw"){
        return Items.find({_id: params})
    }

    getSingleItem(params: string){
        const id = params
        const findOnePromise: any = new Promise(async (reject, resolve)=>{
            await Items.findOne({_id: id}, (err: Error, result: ItemData)=>{
                if(err || result == null){
                    reject(ItemServiceStatus.UNABLE)
                }
                else if(result.userId !== this.currentUser.user._id){
                    reject(ItemServiceStatus.FORBIDDEN)
                }
                else{
                    resolve(result)
                }
            }, {new: true})
        })
        .catch((result)=>{
            if(result == ItemServiceStatus.UNABLE){
                return ItemServiceStatus.UNABLE
            }
            else if(result == ItemServiceStatus.FORBIDDEN){
                return ItemServiceStatus.FORBIDDEN
            }
            else if(result == ItemServiceStatus.ERROR){
                return ItemServiceStatus.ERROR
            }
            else{
                return result
            }
        })
        return findOnePromise
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

    deleteItem(itemId: string, userId: string){
        const ItemDeletePromise = new Promise(async(reject, resolve)=>{
            await Items.findOneAndDelete({_id: itemId, userId}, {useFindAndModify: false}, async (err: Error)=>{
                if(err){
                    reject(ItemServiceStatus.UNABLE)
                }
                else{
                    const checkDelete = await Items.find({_id: itemId})
                    if(checkDelete.length !== 0){
                        reject(ItemServiceStatus.FORBIDDEN)
                    }
                    else{
                        resolve(ItemServiceStatus.SUCCESS)
                    }
                }
            })
        })
        .catch(err => {
            if(err == ItemServiceStatus.UNABLE){
                return ItemServiceStatus.UNABLE
            }
            else if(err == ItemServiceStatus.FORBIDDEN){
                return ItemServiceStatus.FORBIDDEN
            }
            else{
                return ItemServiceStatus.SUCCESS
            }
        })
        return ItemDeletePromise
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
            if(err == ItemServiceStatus.ERROR){
                return ItemServiceStatus.ERROR
            }
            else if(err == ItemServiceStatus.FORBIDDEN){
                return ItemServiceStatus.FORBIDDEN
            }
        })
        return updatePromise
    }


}