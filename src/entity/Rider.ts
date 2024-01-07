import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
    nPreviousRides: number

    @Column()
    rating: number
}
