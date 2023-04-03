import {v4 as uuidv4} from 'uuid'
import { User, UserModel }  from "../models/User"
import { Parking } from "../models/Parking"
import {Request, Response} from "express"
import {validationResult} from "express-validator"
import bcrypt  from 'bcryptjs'
import  jwt  from 'jsonwebtoken' 
import { sequelize } from '../database/db'
import dotenv from 'dotenv'

dotenv.config()

const saltRounds: number = 10


export class UserController {
    constructor() { }


    public static async getAll(res: Response): Promise<void> {
        try {
            const users = await User.findAll()
        
            res.status(200).send({users})
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    public static async create(req: any, res: Response ): Promise<void> {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).send({errors: errors.array()})
            return
        }

        try {
            const salt = await bcrypt.genSalt(saltRounds);

            const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
            const newUserInfo: object = {
                id: uuidv4(),
                email: req.body.email,
                password: hashedPassword,
                userType: req.body.userType
            }
            const user = await UserController.findByEmail(req.body.email)
    
            if (!user) {
                const userCreated = await User.create(newUserInfo)

                res.status(201).send({ message: 'Usuario creado exitosamente', userCreated })
                return
            }
            else{
                res.status(409).send({ message: 'Email duplicated' })
                return
            }

        
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        
        }
    }

    private static async findByEmail(email: string): Promise<UserModel | null>{
        try{
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            return user
        }
        catch(error){
            return null
        }
    } 
    
    public static async login(req: any, res: Response ): Promise<void> {

        const errors =  validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).send({errors: errors.array()})
            return
        }

        try {

            const user = await UserController.findByEmail(req.body.email)

            if(!user){
                res.status(401).send({
                    message: 'Auth failed email or password'
                })
                return
            }

            const result = await bcrypt.compare(req.body.password, String(user?.password))

            if (!result){
                res.status(401).send({
                    message: 'Auth failed email or password x'
                })
                return
            }
            const token: any = jwt.sign(
                {
                    email: user?.email,
                    userId: user?.id,
                    userType: user?.userType
                },
                String(process.env.JWT_KEY),
                {
                    expiresIn: "500h"
                },
            )

            res.status(200).send({ status: "Success", message: 'Auth successful for 500h', userId: user?.id, token: token })
        
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }  

    public static async delete(req: any, res: Response ): Promise<void> {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).send({errors: errors.array()})
            return
        }

        let transaction;

        try {
            transaction = await sequelize.transaction()
        
            await Parking.destroy({
                where:{
                    userid:req.params.id
                }
            });
        
            await User.destroy({
                where:{
                    id:req.params.id
                }
            });
    
            res.json({errorText: 'Usuario y sus propiedades was successfully deleted', status: "Success"})
        
        } catch (err) {
    
            // Rollback transaction if any errors were encountered
            await transaction.rollback()
    
           
            res.json({message: err})
            
        }
    }
    
}
