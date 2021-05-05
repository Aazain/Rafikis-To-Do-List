import { QueryOptions } from "mongoose"
import { Items } from "../models/todo.model"

export enum ItemServiceStatus{
    UNABLE = "UNABLE", ERROR = "ItemServiceError", SUCCESS = "ItemServiceSuccess"
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
    itemStatus!: ItemServiceStatus;

    constructor(currentUser: CurrentUserData){
        this.currentUser = currentUser
    }

    checkItemId(params: string){
        return Items.find({_id: params}, (err: Error)=>{
            if(err){
                this.itemStatus = ItemServiceStatus.ERROR
                return this.itemStatus
            }
        })
    }

    getSingleItem(params: string){
        const id = params
        return Items.findById(id, (err: Error, result: ItemData)=>{
            if(err || result == null){
                this.itemStatus = ItemServiceStatus.UNABLE;
                return this.itemStatus;
            }
            else if(this.currentUser.user._id !== result.userId){
                this.itemStatus = ItemServiceStatus.ERROR
                return this.itemStatus
            }
            else{
                return result
            }
        })

    }

    getSingleItems(params: string){
        const id = params
        try{
            const promide = new Promise (async(reject, resolve)=>{
                Items.findById(id, (err: Error, result: ItemData)=>{
                    if(err || result == null){
                        reject(ItemServiceStatus.UNABLE)
        
                    }
                    else if(this.currentUser.user._id !== result.userId){
                        reject(ItemServiceStatus.ERROR)
        
                    }
                    else{
                         resolve(result)
                    }
                })
            })
            return promide
        }
        catch(err){
            return err
        }
    }

    getItemList(){
        return Items.find({userId: this.currentUser.user._id}, (err: Error, result: object)=>{
            if(err){
                this.itemStatus = ItemServiceStatus.UNABLE;
                return this.itemStatus;
            }
            else{
                return result
            }
        })
    }

    deleteItem(itemId: string){
        return Items.findByIdAndRemove({_id: itemId, userId: this.currentUser.user._id}, {useFindAndModify: false}, (err: Error, result: any)=>{
            if(err){
                this.itemStatus = ItemServiceStatus.UNABLE;
                return this.itemStatus;
            }
            else{
                return ItemServiceStatus.SUCCESS
            }
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
            this.itemStatus = ItemServiceStatus.UNABLE;
            return this.itemStatus;
        })
    }

    updateTask(userId: string, itemId: string, task: string, status: boolean){
        const updatePromise = new Promise(async (resolve, reject)=>{
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
                }
            )
        })
        return updatePromise
    }


}