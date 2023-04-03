import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'
import * as swaggerDocument from './swagger.json'
import { ParkingRoutes } from './routes/parking.routes';
import { UserRoutes } from './routes/user.routes';
dotenv.config()

const app: express.Application = express()
const port = process.env.PORT || 3000;

// BODY PARSER
app.use(json())
app.use(urlencoded({extended: false}))


// SWAGGER DOCS
app.use('/api-parco', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const routerParking = ParkingRoutes.configureRoutes();
const routerUser = UserRoutes.configureRoutes();

app.use('/users', routerUser)
app.use('/parkings', routerParking)


// START SERVER
app.listen(port, () => console.log(`server is running on port ${port}`))

export const apps = app