import {Router} from "express";
import {DriverType, RiderType, RideType} from "../DataTypes";
import {AppDataSource} from "../data-source";
import {Ride} from "../entity/Ride";
import {Driver} from "../entity/Driver";
import {Rider} from "../entity/Rider";


const rideRoutes = Router();
const rideRepository = AppDataSource.getRepository(Ride);
rideRoutes.get("/", async function (req, res) {
  try {
    const rides: RideType[] = await rideRepository.find();
    if (rides.length === 0) {
      res.sendStatus(404);
      return;
    }
    res.json(rides);
  } catch (exception) {
    res.sendStatus(500);
  }
});

rideRoutes.get("/driver/:driverId", async function (req, res) {
  try {
    const driverId: number = Number(req.params.driverId);
    if (isNaN(driverId)) {
      res.sendStatus(400);
      return;
    }

    const rides: RideType[] = await rideRepository.findBy({driver: {id: driverId}});
    if (rides.length === 0) {
      res.sendStatus(404);
      return;
    }
    res.json(rides);
  } catch (exception) {
    res.sendStatus(500);
  }
});

rideRoutes.get("/:rideId", async function (req, res){
  try {
    const rideId: number = Number(req.params.rideId);
    if (isNaN(rideId)) {
      res.sendStatus(400);
      return;
    }

    const ride: RideType = await rideRepository.findOneBy({id: rideId});
    if (ride === null) {
      res.sendStatus(404);
      return;
    }
    res.json(ride);
  } catch (exception) {
    res.sendStatus(500);
  }
});

rideRoutes.get("/rider/:riderId", async function (req, res){
  const riderId: number = Number(req.params.riderId);
  if(isNaN(riderId)) {
    res.sendStatus(400);
    return;
  }

  const rides: RideType[] = await rideRepository.findBy({riders: {id: riderId}});
  if(rides.length === 0) {
    res.sendStatus(404);
    return;
  }

  res.json(rides);
});

rideRoutes.post("/:driverId", async function (req, res){
  try {
    const driverId: number = Number(req.params.driverId);
    if (isNaN(driverId)) {
      res.sendStatus(400);
      return;
    }

    const ride: Ride = new Ride();
    setRideValues(ride, req.body);

    await rideRepository.save(ride);
    res.sendStatus(201);
  } catch (exception) {
    res.sendStatus(500);
  }
});

rideRoutes.patch(":rideId/addRider/:riderId", async function (req, res){
  try {
    const rideId: number = Number(req.params.rideId);
    const riderId: number = Number(req.params.riderId);
    if (isNaN(rideId) || isNaN(riderId)) {
      res.sendStatus(400);
      return;
    }

    const ride: RideType = await rideRepository.findOneBy({id: rideId});
    const rider: RiderType = await AppDataSource.manager.findOneBy(Rider, {id: riderId});
    if (ride === null || rider === null) {
      res.sendStatus(404);
      return;
    }
    ride.riders.push(rider);
    rider.rides.push(ride);
    await rideRepository.save(ride);
    await AppDataSource.manager.save(Rider, rider);
    res.sendStatus(200);
  } catch (exception) {
    res.sendStatus(500);
  }
});

rideRoutes.patch("/:rideId", async function (req, res){
  try {
    const rideId: number = Number(req.params.rideId);
    if (isNaN(rideId)) {
      res.sendStatus(400);
      return;
    }

    const ride: Ride = await rideRepository.findOneBy({id: rideId});
    if (ride === null) {
      res.sendStatus(404);
      return;
    }
    setRideValues(ride, req.body);
    await rideRepository.save(ride);
    res.sendStatus(200);
  } catch (exception) {
    res.sendStatus(500);
  }
});

// TODO: complete delete
rideRoutes.delete("/:rideId", async function (req, res){
  const rideId: number = Number(req.params.rideId);
  if(isNaN(rideId)) {
    res.sendStatus(400);
    return;
  }

  const ride: RideType = await rideRepository.findOneBy({id: rideId});
  const driver: DriverType = await AppDataSource.manager.findOneBy(Driver, {id: ride.driver.id});
  const riders: RiderType[] = [];

});

function setRideValues(ride: Ride, rideData: RideType) {
  ride.driver = rideData.driver;
  ride.riders = rideData.riders;
  ride.origin = rideData.origin;
  ride.destination = rideData.destination;
  ride.departureTime = new Date(rideData.departureTime);
  ride.arrivalTime = new Date(rideData.arrivalTime);
  ride.price = rideData.price;
  ride.isFinished = rideData.isFinished;
}


export default rideRoutes;