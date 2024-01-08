import {Router} from "express";
import {Driver} from "../entity/Driver";
import {AppDataSource} from "../data-source";
import {Car} from "../entity/Car";
import {CarType, DriverType} from "../DataTypes";

const carRoutes = Router();
const carRepository = AppDataSource.getRepository(Car);

carRoutes.get("/driver/:driverId", async function (req, res) {
	try {
		const driverId: number = Number(req.params.driverId);
		if (isNaN(driverId)) {

			res.sendStatus(400);
			return;
		}
		const driver: Driver = await AppDataSource.manager.findOneBy(Driver, {id: driverId})

		if (driver === null) {
			res.sendStatus(404);
			return;
		}

		const car: CarType = await carRepository.findOneBy({id: driver.carId});
		res.json(car);
	} catch (exception) {
		res.sendStatus(500);
	}
});

carRoutes.get("/:carId", async function (req, res){
	try {
		const carId: number = Number(req.params.carId);
		if (isNaN(carId)) {
			res.sendStatus(400);
		}

		const car: CarType = await AppDataSource.manager.findOneBy(Car, {id: carId})
		if(car === null) {
			res.sendStatus(404);
			return
		}
		res.json(car);

	} catch (exception) {
		res.sendStatus(500);
	}
});

// Maybe not needed
carRoutes.post("/", async function (req, res) {
	try {
		const car: Car = new Car();
		setCarValues(car, req.body)

		await carRepository.save(car);
		res.sendStatus(201);
	} catch (exception) {
		res.sendStatus(500)
	}
});

carRoutes.post("/addToDriver/:driverId", async function (req, res){
	try {
		const driverId: number = Number(req.params.driverId);

		if (isNaN(driverId)) {
			res.sendStatus(400);
		}

		const driver: DriverType = await AppDataSource.manager.findOneBy(Driver, {id: driverId});
		if (driver === null) {
			res.sendStatus(404);
			return;
		}
		const car = new Car();
		setCarValues(car, req.body);
		await carRepository.save(car);
		driver.carId = car.id;

		await AppDataSource.manager.save(Driver, driver);
		res.sendStatus(201);
	} catch (exception) {
		res.sendStatus(500);
	}
});

carRoutes.patch("/:carId", async function (req, res) {
	try {
		const carId: number = Number(req.params.carId);
		if(isNaN(carId)) {
			res.sendStatus(400);
			return;
		}

		const car: Car = await carRepository.findOneBy({id: carId});
		if(car === null) {
			res.sendStatus(404);
			return;
		}
		setCarValues(car, req.body)

		await carRepository.save(car);
		res.sendStatus(200);
	} catch (exception) {
		res.sendStatus(500);
	}
});

carRoutes.delete("/:carId", async function (req, res){
	try {
		const carId: number = Number(req.params.carId);
		if (isNaN(carId)) {
			res.sendStatus(400);
		}

		await AppDataSource.manager.update(Driver, {carId: carId}, {carId: null});
		await carRepository.delete({id: carId})

		res.sendStatus(204);
	} catch (exception) {
		res.sendStatus(500);
		console.log(exception);
	}
});

function setCarValues(car: Car, carData: CarType): void {
	car.make = carData.make;
	car.model = carData.model;
	car.year = carData.year;
	car.color = carData.color;
	car.nSeats = carData.nSeats;
}

export default carRoutes;