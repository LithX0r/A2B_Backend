import { AppDataSource } from "./data-source"
import { Express, Request, Response } from "express";
import express = require("express");
import riderRoutes from "./routes/riderRoutes";
import carRoutes from "./routes/carRoutes";
import driverRoutes from "./routes/driverRoutes";
import rideRoutes from "./routes/rideRoutes";
import {Driver} from "./entity/Driver";
import {Car} from "./entity/Car";

const app: Express = express();
const port = 3000;
const cors = require('cors');

AppDataSource.initialize().then(async () => {
    console.log("Datasource has been initialized.");
    const testDriver = new Driver();
    testDriver.id = 1;
    testDriver.firstName = 'Max';
    testDriver.lastName = 'Mustermann';
    testDriver.age = 20;
    testDriver.homeTownID = 1;
    testDriver.rating = 3.6;
    testDriver.rides = [];
    testDriver.kmDriven = 1000;
    testDriver.co2Saved = 100;
    testDriver.numberOfRides = 10;

    const testCar = new Car();
    testCar.id = 1;
    testCar.make = 'Tesla';
    testCar.model = 'Model X';
    testCar.year = 2021;
    testCar.nSeats = 4;
    testCar.color = 'black';
    testDriver.carId = testCar.id;
    AppDataSource.manager.save(Driver, testDriver);
    AppDataSource.manager.save(Car, testCar);

}).catch(error => console.log(error))

app.use(express.json());
app.use(cors());
app.use("/api/rider", riderRoutes);
app.use("/api/car", carRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/ride", rideRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
