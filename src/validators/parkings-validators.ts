import { check, query, param } from 'express-validator'
import { TypeParking } from '../utils'

export class ParkingValidator {
    public static create(): any[] {
      return [
        check('name').notEmpty().withMessage('El nombre es obligatorio'),
        check('contact').notEmpty().withMessage('El contact es obligatorio'),
        check('parkingType').isIn(Object.values(TypeParking)).withMessage(`El tipo de documento debe ser uno de: ${Object.values(TypeParking).join(', ')}`),
        check('spots')
          .notEmpty().withMessage('El campo espot es obligatorio')
          .isInt().withMessage('El campo spot  debe de ser un numero entero')
          .custom((value) => {
            if (value < 50) {
              throw new Error('Estacionamiento muy pequeño')
            }
            if (value > 150) {
                throw new Error('Estacionamiento muy grande')
              }
            return true
          })
      ]
    }

    public static getAll(): any[] {
      return  [
        query('skip').optional().isInt({ min: 0 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('order').optional().isIn(['asc', 'desc']),
        query('orderBy').optional()
      ];
    }

    public static checkIn(): any[] {
      return  [
        param('parkingId').notEmpty().withMessage('El parkingID es obligatorio'),
      ];
    }

    public static update(): any[] {
      return [
        param('id').notEmpty().withMessage('El id es obligatorio'),
        check('contact').notEmpty().withMessage('El contact es obligatorio'),
        check('spots')
          .notEmpty().withMessage('El campo espot es obligatorio')
          .isInt().withMessage('El campo spot  debe de ser un numero entero')
          .custom((value) => {
            if (value < 50) {
              throw new Error('Estacionamiento muy pequeño')
            }
            if (value > 150) {
                throw new Error('Estacionamiento muy grande')
              }
            return true
          })
      ];
    }

  }