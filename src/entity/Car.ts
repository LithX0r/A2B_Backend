import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Car {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  make: string

  @Column()
  model: string

  @Column()
  year: number

  @Column()
  color: string

  @Column()
  nSeats: number
}
