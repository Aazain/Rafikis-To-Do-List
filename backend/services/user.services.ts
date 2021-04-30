import { Users } from "../models/users.model"
import { PasswordService } from "./password.services"
import { UserControllerService } from "../controllers/users.controller"
const bcrypt = require ('bcrypt')

export class UserService{
    email:string
    password: string | undefined
    userControllerService!: UserControllerService | undefined

    constructor(email: string, password: string | undefined){
        this.email = email
        this.password = password
    }

    async createUser(){
        const checkEmail: object = await this.findUser();
        if(checkEmail !== null){
            this.userControllerService = UserControllerService.ERROR;
            return this.userControllerService;
        }
        else{
            const hashedPassword = await bcrypt.hash(this.password, 10)
            const userList = new Users({
                email: this.email,
                password: hashedPassword
            })
            this.userControllerService = UserControllerService.SUCCESS;
            userList.save();
            return this.userControllerService
        }
    }

    async userLogin(){
        const currentUser = await this.findUser();
        if(!currentUser){
            this.userControllerService = UserControllerService.ERROR
            return this.userControllerService
        }
        else{
            const passService = new PasswordService(this.password, currentUser)
            const loginAuth = await passService.userAuth();
            return loginAuth
        }
    }

    async findUser(){
        const currentUser = await Users.findOne({email: this.email})
        return currentUser
    }
} 