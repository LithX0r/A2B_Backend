import {Router} from "express";
import {Rider} from "../entity/Rider";
import {AppDataSource} from "../data-source";

const riderRoutes = Router();

riderRoutes.get("/:riderId", async function (req, res) {
    try {
        const riderId = parseInt(req.params.riderId, 10);
        console.log(`riderId: ${riderId}`)

        if (isNaN(riderId)) {
            res.status(400).json({ message: "Invalid riderId provided" });
            return;
        }

        const rider = await AppDataSource.getRepository(Rider).findOneBy({id: riderId});
        console.log(`rider: ${rider}`)

        if (rider != null) {
            res.json(rider);
        } else {
            res.status(404).json({message: `Rider with id not found`});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default riderRoutes;