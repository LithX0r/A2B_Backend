import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm"
import {Ride} from "./Ride";

@Entity()
export class Rider {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    homeTownID: number

    @Column()
    rating: number

    @ManyToMany(() => Ride, (ride) => ride.riders)
    rides: Ride[]
}
