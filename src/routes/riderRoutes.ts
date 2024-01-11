import {Router} from "express";
import {Rider} from "../entity/Rider";
import {AppDataSource} from "../data-source";
import {RiderType} from "../DataTypes";
import {Ride} from "../entity/Ride";

const riderRoutes = Router();
const riderRepository = AppDataSource.getRepository(Rider);
riderRoutes.get("/:riderId", async function (req, res) {
  try {
    const riderId = parseInt(req.params.riderId, 10);

    if (isNaN(riderId)) {
      res.status(400).json({message: "Invalid riderId provided"});
      return;
    }

    const rider: RiderType = (await riderRepository.find({
      relations: {rides: {driver: true, riders: true}},
      where: {id: riderId},
      take: 1
    }))[0];

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
    const riders = await AppDataSource.getRepository(Rider).find({
      relations: {
        rides: {
          driver: true,
          riders: true,
        }
      }
    });

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
    const {firstName, lastName, age, homeTownID, rating, rides, kmDriven, co2Saved, numberOfRides} = req.body;

    const newRider = new Rider();
    newRider.firstName = firstName;
    newRider.lastName = lastName;
    newRider.age = age;
    newRider.homeTownID = homeTownID;
    newRider.rating = rating;
    newRider.rides = [];
    newRider.rides.push(rides);
    newRider.kmDriven = kmDriven;
    newRider.co2Saved = co2Saved;
    newRider.numberOfRides = numberOfRides;

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
      res.status(400).json({message: "Invalid riderId provided"});
      return;
    }

    const riderRepository = AppDataSource.getRepository(Rider);
    const rider: RiderType = (await riderRepository.find({relations: {rides: {riders: true}}, where: {id: riderId}, take: 1}))[0];

    if (rider != null) {
      rider.rides.forEach((ride) => {
        ride.riders = ride.riders.filter((r) => r.id !== riderId);
        AppDataSource.manager.save(Ride, ride);
      });
      await riderRepository.remove(rider);
      res.status(204).json({message: `Rider with id ${riderId} deleted`});
    } else {
      res.status(404).json({message: `Rider with id not found`});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

export default riderRoutes;