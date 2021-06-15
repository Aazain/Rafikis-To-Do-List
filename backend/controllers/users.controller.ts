
import express, { Application, json, request, Request, Response } from "express"
import { UserService } from "../services/user.services"
import { TokenService, TokenStatus } from "../services/token.services"
import { userList } from "../services/userlist.services"
import { PasswordAuth } from "../services/password.services"
import { emailValidation } from "../services/email.validation"

export enum UserControllerService{
    ERROR = "ERROR", SUCCESS = "SUCCESS"
}

export class userController{
    private app: Application;
    
    constructor(app: Application){
        this.app = app;
    }

    async getUsers(req: Request, res: Response) {
            const users = new userList();
            const getAllUsers = await users.getUserList()
            if(getAllUsers == null){
                return res.status(404).send({message:"Unable to find Users"})
            }else{
                res.send(getAllUsers)
            }
    }

    async signUp(req: Request, res: Response){
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userService = new UserService(userEmail, userPassword)
            const validateEmail = new emailValidation
            const emailCheck = validateEmail.validate(userEmail)
            if(!userPassword){
                return res.status(403).send({message:"please enter a password"})
            }
            else{
                if(emailCheck == true){
                    const createUser = await userService.createUser();
                    if(createUser == UserControllerService.ERROR){
                        return res.status(409).send({message:"a user with this email already exists"})
                    }
                    else{
                        return res.status(201).send({message:"successfully created user"})
                    }
                }
                else{
                    return res.status(403).send({message:"please enter a valid email and password"})
                }
            }
    }

    async logIn(req: Request, res: Response){
        const userEmail = req.body.email
        const userPassword = req.body.password
        const validateEmail = new emailValidation
        const emailCheck = validateEmail.validate(userEmail)
        if(emailCheck == true){
            const userService = new UserService(userEmail, userPassword)
            const loginUser = await userService.userLogin();
            if(loginUser == PasswordAuth.INCORRECT){
                return res.status(403).send({message: "incorrect email or password"})
            }
            else if(!userPassword){
                return res.status(403).send({message:"please enter a password"})
            }
            else if(loginUser == UserControllerService.ERROR){
                return res.status(404).send({message:"user does not exist"})
            }
            else{
                return res.send(loginUser)
            }
        }
        else{
            return res.status(403).send({message:"please enter a valid email"})
        }
    }

    async refreshToken(req: Request, res: Response){
            const user = new UserService(req.body.email, req.body.password)
            const findUser = await user.findUser()
            const authHeader = req.headers["authorization"]
            const refreshToken = authHeader?.split(" ")[1]
            const refreshTokenService = new TokenService();
            const refreshAccess = refreshTokenService.refreshAccessToken(refreshToken, findUser)
            if(refreshAccess == TokenStatus.INVALID){
                return res.status(400).send({message:"invalid token"})
            }
            else if(refreshAccess == TokenStatus.ERROR){
                return res.status(400).send({message:"please provide an access token"})
            }
            else{
                return res.status(200).send(refreshAccess)
            }
    }
}