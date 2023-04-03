import { check, param } from 'express-validator';
import { TypeUser } from '../utils';

export class UserValidator {
    public static login(): any[] {
      return [
        check('email')
          .isEmail()
          .normalizeEmail(),
        check('password')
          .isLength({min: 5, max: 20})
      ]
    }

    public static create(): any[] {
      return [
        check('email')
          .isEmail()
          .normalizeEmail(),
        check('password')
          .isLength({min: 5, max: 20}),
        check('userType')
        .isIn(Object.values(TypeUser)).withMessage(`El tipo de documento debe ser uno de: ${Object.values(TypeUser).join(', ')}`)
      ]
    }

    public static delete(): any[]{
      return [
        param('id').notEmpty().withMessage('El id de usuario a eliminar es obligatorio'),
      ]
    }

  }