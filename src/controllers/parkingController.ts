import {v4 as uuidv4} from 'uuid'
import {Parking, ParkingX }  from '../models/Parking'
import {Request, Response} from "express"
import {validationResult} from "express-validator"
import { ParkingFactory } from '../factories/parkingFactory'

export class ParkingController {
    constructor() { }


    public static async getAll(req: Request, res: Response): Promise<void> {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).send({errors: errors.array()})
            return
        }

        try {
            const page = Number(req.query.skip) || 0
            const limit = Number(req.query.limit) || 10
            const order = req.query.order || 'asc'
            const orderDirection = order === 'asc' ? 'ASC' : 'DESC'
            const orderBy = req.query.orderBy || 'name'
          
            const parkings = await Parking.findAndCountAll({
                limit: Number(limit),
                offset: page * limit,
                order: [[String(orderBy), orderDirection]],
            })

            const totalPages = Math.ceil(parkings / Number(limit))
        
            res.status(201).send({   
                totalPages,
                currentPage: Number(page) + 1,
                parkings
            });
        } 
        catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    private static async getFindById(id: string):  Promise<ParkingX | null>{
        try{
            const parking = await Parking.findByPk(id)
            return parking
        }
        catch(error){
            console.log("error")
            return null
        }
    }

    private static async getFindByName(name: string): Promise<ParkingX | null>{
        try{
            const parking = await Parking.findOne({where: {name}})
            return parking
        }
        catch(error){
            console.log("error")
            return null
        }
    }

    public static async checkIn(req: any, res: Response):Promise<void> {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).send({errors: errors.array()})
            return
        }

        const parking = await ParkingController.getFindById(req.params.parkingId)
        
        if(!parking){
            res.status(404).send("Id not found")
            return
        }

        const parkingFactory = ParkingFactory.create(String(parking?.parkingType), req.userData.userType)
        const { success, errorCode, message } = parkingFactory.enter()
      
        if (success) {
          res.send('Welcome to the parking!')
          return
        } else {
          res.status(errorCode).send(message)
          return
        }
    }

    public static async update(req: any, res: Response): Promise<void>{
        const { id } = req.params
        const { contact, spots } = req.body
      
        try {
            const result = await Parking.update({ contact, spots }, {
                where: { id },
            })
      
            if (!result) {
                res.status(404).send('Parking not found')
                return
            }
      
            res.status(200).send('Parking update')
        } catch (error) {
            console.error(error);
            res.status(500).send('Error in server')
        }
    
    } 

    public static async create(req: any, res: Response): Promise<void> {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).send({errors: errors.array()})
            return
        }

        const data = req.body

        const existName = await ParkingController.getFindByName(data.name)

        if(existName){
            res.status(409).send({ message: 'Name duplicated' })
            return
        }

        try {
            const newItemInfo: ParkingX = {id: uuidv4(), 
                userid: req.userData.userId,
                name: data.name,
                spots: data.spots,
                contact: data.contact, 
                parkingType: data.parkingType,
            }
          
            const parking = await Parking.create(newItemInfo)

            res.status(201).send({ message: 'Parking creasted', parking })
        
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        
        }
    }        
}
