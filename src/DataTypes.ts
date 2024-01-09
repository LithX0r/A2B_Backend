export interface RiderType {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    homeTownID: number;
    rating: number;
    rides: RideType[];
}

export interface DriverType {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    homeTownID: number;
    rating: number;
    rides: RideType[];
    carId: number;
}

export interface RideType {
    id: number;
    driver: DriverType;
    riders: RiderType[];
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    price: number;
    isFinished: boolean;
}

export interface CarType {
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    nSeats: number;
}

