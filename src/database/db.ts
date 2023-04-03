import { Sequelize } from 'sequelize'

import dotenv from 'dotenv'

dotenv.config()
export const sequelize = new Sequelize(String(process.env.DB_NAME), String(process.env.DB_USER), String(process.env.DB_PASSWORD), {
    dialect: "postgres",
    define: {
        freezeTableName: true
    },
    host: process.env.DB_HOST,
    port: 5432
})

