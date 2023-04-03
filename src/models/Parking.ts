import { Model, DataTypes, BuildOptions, IntegerDataType} from 'sequelize'
import { sequelize } from "../database/db"
import { User } from "../models/User"
import { TypeParking } from '../utils';

export interface ParkingModel extends Model {
    readonly id: string
    userid: string
    name: string
    spots: number
    contact: string
    parkingType: TypeParking

}

export interface ParkingX{
    readonly id: string
    userid: string
    name: string
    spots: number
    contact: string
    parkingType: TypeParking
}

type ParkingModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ParkingModel
}

const parkingTypeValues = Object.values(TypeParking) as string[]

export const Parking = <ParkingModelStatic>sequelize.define(
    'parking',
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        userid: {
            type: DataTypes.STRING,
            references: { model: 'user', key: 'id' },
            allowNull: false,
        },
        spots:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parkingType: {
            type: DataTypes.ENUM(...parkingTypeValues),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    })
    
    User.belongsTo(Parking, {foreignKey: 'id'})

    Parking.hasOne(User, {foreignKey: 'id',sourceKey: 'userid'})

