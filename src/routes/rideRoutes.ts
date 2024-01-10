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
    const rides: RideType[] = await rideRepository.find({
      relations: {
        driver: true,
        riders: true
      }
    });
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

    const rides: RideType[] = await rideRepository.find({
      where: {
        driver: {
          id: driverId
        }
      },
      relations: {
        driver: true,
        riders: true
      }
    });
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

    // const ride: RideType = await rideRepository.findOneBy({id: rideId});
    const ride: RideType = (await rideRepository.find({
      where: {
        id: rideId
      },
      relations: {
        driver: true,
        riders: true,
      },
      take: 1
    }))[0];
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
  try {
    const riderId: number = Number(req.params.riderId);
    if (isNaN(riderId)) {
      res.sendStatus(400);
      return;
    }

    const rider: RiderType = (await AppDataSource.manager.find(Rider,{
      where: {
        id: riderId
      },
      relations: {
        rides: {
          driver: true,
          riders: true
        }
      },
      take: 1
    }))[0];
    if (rider === null || rider.rides.length === 0) {
      res.sendStatus(404);
      return;
    }

    res.json(rider.rides);
  } catch (exception) {
    res.sendStatus(500);
  }
});

rideRoutes.post("/:driverId", async function (req, res){
  try {
    const driverId: number = Number(req.params.driverId);
    if (isNaN(driverId)) {
      res.sendStatus(400);
      return;
    }

    const ride: Ride = new Ride();
    const driver: Driver = await AppDataSource.manager.findOneBy(Driver, {id: driverId});
    if(ride === null || driver === null) {
      res.sendStatus(404);
      return;
    }
    ride.driver = driver;
    console.log(driver);
    // driver.rides.push(ride);
    setRideValues(ride, req.body);


    await AppDataSource.manager.save(ride.driver);
    await rideRepository.save(ride);
    res.sendStatus(201);
  } catch (exception) {
    console.log(exception)
    res.sendStatus(500);
  }
});

rideRoutes.patch("/:rideId/addRider/:riderId", async function (req, res){
  try {
    const rideId: number = Number(req.params.rideId);
    const riderId: number = Number(req.params.riderId);
    if (isNaN(rideId) || isNaN(riderId)) {
      res.sendStatus(400);
      return;
    }

    const ride: RideType = (await rideRepository.find(
      {
        where: {
          id: rideId
        },
        relations: {
          riders: true
        },
        take: 1
      }))[0];
    const rider: RiderType = (await AppDataSource.manager.find(Rider, {
      relations: {
        rides: true
      },
      where:{
        id: riderId
      },
      take: 1
  }))[0];
    if (ride === undefined || rider === undefined) {
      console.log(rider);
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
    console.log(exception);
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
  try {
    const rideId: number = Number(req.params.rideId);
    if (isNaN(rideId)) {
      res.sendStatus(400);
      return;
    }

    // const ride: RideType = await rideRepository.findOneBy({id: rideId});
    const ride: RideType = (await rideRepository.find({
      where: {
        id: rideId
      },
      relations: {
        driver: {
          rides: true
        },
        riders: {
          rides: true
        }
      },
      take: 1
    }))[0];
    if(ride === null) {
      res.sendStatus(404);
      return;
    }

    // const driver: DriverType = await AppDataSource.manager.findOneBy(Driver, {id: ride.driver.id});
    const driver: DriverType = ride.driver;
    if(driver === null) {
      res.sendStatus(404);
      return;
    }
    driver.rides = driver.rides.filter((ride) => ride.id !== rideId);
    ride.riders.forEach((rider) => {
      rider.rides = rider.rides.filter((r) => r.id !== rideId);
      AppDataSource.manager.save(Rider, rider);
    });
    await AppDataSource.manager.save(Driver, driver);
    await rideRepository.remove(ride);
    res.sendStatus(204);
  } catch (exception) {
    res.sendStatus(500);
    console.log(exception);
  }

});

function setRideValues(ride: Ride, rideData: RideType) {
  ride.origin = rideData.origin;
  ride.destination = rideData.destination;
  ride.departureTime = new Date(rideData.departureTime);
  ride.arrivalTime = new Date(rideData.arrivalTime);
  ride.price = rideData.price;
  ride.isFinished = rideData.isFinished;
}


export default rideRoutes;