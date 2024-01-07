import "reflect-metadata"
import { DataSource } from "typeorm"
import { Rider } from "./entity/Rider"
import {Driver} from "./entity/Driver";
import {Ride} from "./entity/Ride";
import {Car} from "./entity/Car";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Rider, Driver, Ride, Car],
    migrations: [],
    subscribers: [],
})
