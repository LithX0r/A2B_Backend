import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Relation, ManyToOne, OneToMany} from "typeorm"
import { Driver } from "./Driver"
import { Rider } from "./Rider"

@Entity()
export class Ride {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Driver)
  @JoinColumn()
  driver: Relation<Driver>

  @OneToMany(() => Rider, rider => rider.rides)
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