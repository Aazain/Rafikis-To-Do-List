import { model, Mongoose, Schema } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String
});

export const Users = model("Users", userSchema)