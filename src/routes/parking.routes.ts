import { Router } from 'express';
import{ ParkingController } from '../controllers/parkingController'
import { chekAuth }  from  '../middleware/check-auth'
import { ParkingValidator } from '../validators/parkings-validators'


export class ParkingRoutes {
  public static configureRoutes(): Router {
    const router = Router()

    router.get('/',chekAuth,ParkingValidator.getAll(),ParkingController.getAll)
    
    router.post('/create', chekAuth,ParkingValidator.create(),ParkingController.create)

    router.patch('/update/:id',ParkingValidator.update() , ParkingController.update)
    
    router.get('/checkin/:parkingId', chekAuth, ParkingValidator.checkIn(), ParkingController.checkIn)

    return router
  }
}