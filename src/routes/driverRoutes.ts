import { Router} from "express";
import {AppDataSource} from "../data-source";
import {Driver} from "../entity/Driver";

const driverRoutes = Router();

driverRoutes.get("/:driverId", async function (req, res) {
    try {
        const driverId = parseInt(req.params.driverId, 10);
        console.log(`driverId: ${driverId}`)

        if (isNaN(driverId)) {
            res.status(400).json({ message: "Invalid driverId provided" });
            return;
        }

        const driver = await AppDataSource.getRepository(Driver).findOneBy({id: driverId});
        console.log(`driver: ${driver}`)

        if (driver != null) {
            res.json(driver);
        } else {
            res.status(404).json({message: `Driver with id not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

driverRoutes.get("/", async function (req, res) {
    try {
        const drivers = await AppDataSource.getRepository(Driver).find()

        if (drivers != null) {
            if (drivers.length == 0) {
                res.status(404).json({message: `Drivers table is empty`});
                return;
            }
            res.json(drivers);
        } else {
            res.status(404).json({message: `Drivers not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

driverRoutes.post("/", async function (req, res) {
    try {
        const { firstName, lastName, age, homeTownID, rating, carID, rides } = req.body;

        const newDriver = new Driver();
        newDriver.firstName = firstName;
        newDriver.lastName = lastName;
        newDriver.age = age;
        newDriver.homeTownID = homeTownID;
        newDriver.rating = rating;
        newDriver.carId = carID;
        newDriver.rides = rides;

        const driverRepository = AppDataSource.getRepository(Driver);
        const savedDriver = await driverRepository.save(newDriver);
        res.status(201).json(savedDriver);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

driverRoutes.delete("/:driverId", async function (req, res) {
    try {
        const driverId = parseInt(req.params.driverId, 10);

        if (isNaN(driverId)) {
            res.status(400).json({ message: "Invalid driverId provided" });
            return;
        }

        const driverRepository = AppDataSource.getRepository(Driver);
        const driver = await driverRepository.findOneBy({id: driverId});

        if (driver != null) {
            await driverRepository.remove(driver);
            res.status(200).json({message: `Driver ${driver.firstName} ${driver.lastName} with id ${driverId} deleted`});
        } else {
            res.status(404).json({message: `Driver with id not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})



export default driverRoutes;