import { NextFunction, Response } from "express"
import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

export const chekAuth  = (req, res: Response, next: NextFunction) => {
    try {
       
        const token = req.headers.authorization
        
        const decoded:any = jwt.verify(token, String(process.env.JWT_KEY))
        req.userData = decoded
        next()
    } catch (error) {
        next(error)
    }
}

