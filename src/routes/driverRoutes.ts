import {Router} from "express";
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



export default driverRoutes;