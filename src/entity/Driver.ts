import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Relation, ManyToOne, OneToMany} from "typeorm";
import {Car} from "./Car";
import {Ride} from "./Ride";

@Entity()
export class Driver {

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

  @OneToMany(() => Ride, ride => ride.driver)
  @JoinColumn()
  rides: Ride[]

  @JoinColumn()
  car: number

}