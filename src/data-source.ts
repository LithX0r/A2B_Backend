import "reflect-metadata"
import { DataSource } from "typeorm"
import { Rider } from "./entity/Rider"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Rider],
    migrations: [],
    subscribers: [],
})
