import { model, Schema } from "mongoose";

const listSchema = new Schema({
    userId:String,
    task:String,
    status:Boolean
},
{
    timestamps:true
})

const Items = model("Items", listSchema)