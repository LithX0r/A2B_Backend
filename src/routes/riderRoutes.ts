import {Router} from "express";
import {Rider} from "../entity/Rider";
import {AppDataSource} from "../data-source";

const riderRoutes = Router();

riderRoutes.get("/:riderId", async function (req, res) {

})

export default riderRoutes;