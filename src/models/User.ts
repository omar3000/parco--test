import { Model, DataTypes, BuildOptions} from 'sequelize';
import { sequelize } from "../database/db"
import { Parking }  from '../models/Parking'
import { TypeUser} from '../utils';
export interface UserModel extends Model {
    readonly id: string
    email: string
    password: string
    userType: TypeUser
}

export type UserModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel
}


const userTypeValues = Object.values(TypeUser) as string[]


export const User = <UserModelStatic>sequelize.define(
    'user',
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userType: {
            type: DataTypes.ENUM(...userTypeValues),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })