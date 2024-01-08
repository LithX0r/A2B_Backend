import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, Relation, ManyToOne, OneToMany} from "typeorm"
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

  @Column("varchar")
  origin: string

  @Column("varchar")
  destination: string

  @Column("date")
  departureTime: Date

  @Column("date")
  arrivalTime: Date

  @Column()
  price: number

  @Column()
  isFinished: boolean
}