import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Relation,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm"
import { Driver } from "./Driver"
import { Rider } from "./Rider"

@Entity()
export class Ride {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Driver, (driver) => driver.rides, {onDelete: "SET NULL"})
  driver: Relation<Driver>

  @ManyToMany(() => Rider, rider => rider.rides)
  @JoinTable()
  riders: Rider[]

  @Column("varchar")
  origin: string

  @Column("varchar")
  destination: string

  @Column("varchar")
  departureTime: Date

  @Column("varchar")
  arrivalTime: Date

  @Column()
  price: number

  @Column()
  isFinished: boolean
}