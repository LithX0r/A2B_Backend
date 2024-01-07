import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Relation} from "typeorm"
import { Driver } from "./Driver"
import { Rider } from "./Rider"

@Entity()
export class Ride {

  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Relation<Driver>

  @OneToOne(() => Rider)
  @JoinColumn()
  riders: Relation<Rider[]>

  @Column()
  origin: string

  @Column()
  destination: string

  @Column()
  departureTime: Date

  @Column()
  arrivalTime: Date

  @Column()
  price: number
}