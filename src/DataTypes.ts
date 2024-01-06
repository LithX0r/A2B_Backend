//DataTypes for the carpooling project

//RiderType is for the people who are looking for a ride
interface RiderType{
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    homeTownID: number;
    nPreviousRides: number;
    rating: number;
}

//DriverType is for the people who are offering a ride
interface DriverType{
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    homeTownID: number;
    nPreviousRides: number;
    rating: number;
    car: CarType;
}

//RideType is for the rides that are being offered
interface RideType{
    id: number;
    driver: DriverType;
    riders: RiderType[];
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
}

//CarType is for the cars that the drivers are offering
interface CarType{
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    nSeats: number;
}