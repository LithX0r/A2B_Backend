import {Router} from "express";
import {Rider} from "../entity/Rider";
import {AppDataSource} from "../data-source";

const riderRoutes = Router();

riderRoutes.get("/:riderId", async function (req, res) {
    try {
        const riderId = parseInt(req.params.riderId, 10);

        if (isNaN(riderId)) {
            res.status(400).json({ message: "Invalid riderId provided" });
            return;
        }

        const rider = await AppDataSource.getRepository(Rider).findOneBy({id: riderId});

        if (rider != null) {
            res.json(rider);
        } else {
            res.status(404).json({message: `Rider with id not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

riderRoutes.get("/", async function (req, res) {
    try {
        const riders = await AppDataSource.getRepository(Rider).find()

        if (riders != null) {
            if (riders.length == 0) {
                res.status(404).json({message: `Riders table is empty`});
                return;
            }
            res.json(riders);
        } else {
            res.status(404).json({message: `Riders not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

riderRoutes.post("/", async function (req, res) {
    try {
        const { firstName, lastName, age, homeTownID, rating, rides } = req.body;

        const newRider = new Rider();
        newRider.firstName = firstName;
        newRider.lastName = lastName;
        newRider.age = age;
        newRider.homeTownID = homeTownID;
        newRider.rating = rating;
        newRider.rides = rides;

        const riderRepository = AppDataSource.getRepository(Rider);
        const savedRider = await riderRepository.save(newRider);
        res.status(201).json(savedRider);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

riderRoutes.delete("/:riderId", async function (req, res) {
    try {
        const riderId = parseInt(req.params.riderId, 10);

        if (isNaN(riderId)) {
            res.status(400).json({ message: "Invalid riderId provided" });
            return;
        }

        const riderRepository = AppDataSource.getRepository(Rider);
        const rider = await riderRepository.findOneBy({id: riderId});

        if (rider != null) {
            await riderRepository.delete(rider);
            res.status(204).json({message: `Rider with id ${riderId} deleted`});
        } else {
            res.status(404).json({message: `Rider with id not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default riderRoutes;