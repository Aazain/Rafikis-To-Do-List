
import express, { Application, Request, Response } from "express"
import { Users } from "../models/users.model";
const app:Application = express();

module.exports = (app:any)=>{

    app.get( "/users", ( req:Request, res:Response ) => {
       Users.find({}, (err, foundData)=>{
            if(err){
                res.status(404).send("Unable to find Users")
            }
            else{
                res.send({foundData})
            }
        })
    });

}