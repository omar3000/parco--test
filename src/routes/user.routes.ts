import { Router } from 'express';
import{ UserController } from '../controllers/userController'
import { chekAuth } from '../middleware/check-auth'
import { UserValidator } from '../validators/user-validators'

export class UserRoutes {
  public static configureRoutes(): Router {
    const router = Router()
    
    router.get('/', chekAuth, UserController.getAll)
    
    router.post('/create',UserValidator.create() , UserController.create)

    router.post('/login',UserValidator.login(), UserController.login)

    router.delete('/delete/:id', chekAuth,UserValidator.delete(), UserController.delete)

    return router
  }
}