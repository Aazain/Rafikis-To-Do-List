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

    async getSingleItem(params: string) {
        const id = params;
        try {
            const result = await Items.findOne({ _id: id });

            if (!result || !result.userId) {
                return ItemServiceStatus.UNABLE;
            }

            if (!result) {
                return ItemServiceStatus.UNABLE;
            } else if (result.userId.toString() !== this.currentUser.user._id.toString()) {
                return ItemServiceStatus.FORBIDDEN;
            }

            return result;
        } catch (err) {
            console.error(err);
            return ItemServiceStatus.ERROR;
        }
    }

    
    async getItemList(): Promise<ItemServiceStatus | any[]> {
        try {
            const items = await Items.find({userId: this.currentUser.user._id});
            if (!items) {
                return ItemServiceStatus.UNABLE;
            }
            return items;
        } catch (err) {
            console.error(err);
            return ItemServiceStatus.UNABLE;
        }
    }


    async deleteItem(itemId: string, userId: string): Promise<ItemServiceStatus>{
        try {
            const deletedItem = await Items.findOneAndDelete({ _id: itemId, userId });
            if (!deletedItem) {
                return ItemServiceStatus.FORBIDDEN;
            }

            const checkDelete = await Items.find({ _id: itemId });
            if (checkDelete.length !== 0) {
                return ItemServiceStatus.UNABLE;
            }

            return ItemServiceStatus.SUCCESS;
        } catch (err) {
            return ItemServiceStatus.UNABLE;
        }
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

    async updateTask(userId: string, itemId: string, task: string, status: boolean): Promise<ItemServiceStatus> {
        try {
            if (userId !== this.currentUser.user._id.toString()) {
                return ItemServiceStatus.FORBIDDEN;
            }

            const updatedItem = await Items.findOneAndUpdate(
                { _id: itemId, userId },
                { $set: { task, status } },
                { new: true }
            );

            if (!updatedItem) {
                return ItemServiceStatus.ERROR;
            }

            return ItemServiceStatus.SUCCESS;
        } catch (err) {
            return ItemServiceStatus.ERROR;
        }
    }


}