interface RiderType {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    homeTownID: number;
    nPreviousRides: number;
    rating: number;
}

interface DriverType {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    homeTownID: number;
    nPreviousRides: number;
    rating: number;
    car: CarType;
}

interface RideType {
    id: number;
    driver: DriverType;
    riders: RiderType[];
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
}

interface CarType {
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    nSeats: number;
}