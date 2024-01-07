
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, VirtualColumn } from "typeorm";
import { Users } from "./users.entity";


@Entity()
@Index(['lat', 'long'], {unique: true})
export class Addresses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: String,
    })
    specifically: string;

    @Column({
        type: "real",
        select: false,
    })
    lat: number;


    @Column({
        type: "real",
        select: false,
    })
    long: number;

    @Column({
        type: String
    })
    userId: string;

    @OneToOne((type) => Users)
    @JoinColumn({
        name: 'userId',
    })
    users: Users
}