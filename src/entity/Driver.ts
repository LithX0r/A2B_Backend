import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Relation} from "typeorm";
import {Car} from "./Car";

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
  nPreviousRides: number

  @Column()
  rating: number

  @OneToOne(() => Car)
  @JoinColumn()
  car: Relation<Car>

}