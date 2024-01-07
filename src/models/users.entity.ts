import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Addresses } from "./address.entity";
import { Posts } from "./posts.entity";
import { Comments } from "./comments.entity";
import { Ratings } from "./rating.entity";


@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: String,
        nullable: false,
        unique: true,
    })
    username: string;

    @Column({
        type: String,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: String,
        nullable: false,
    })
    password: string;

    @Column({
        type: Boolean,
        default: false,
    })
    isEnable2FA: boolean

    @Column({
        type: String,
    })
    twoFaSecret: string;

    @Column({
        type: Boolean,
        default: false
    })
    confirm: boolean

    @OneToOne((type) => Addresses)
    @JoinColumn({
        name: 'id',
    })
    addresses: Addresses

    @OneToMany(() => Posts, posts=> posts.user)
    @JoinColumn({
        name: 'id',
    })
    posts: Posts[]

    @OneToMany(() => Comments, comments => comments.user)
    @JoinColumn({
        name: 'id'
    })
    comments: Comments[]

    @OneToMany(() => Ratings, ratings => ratings.user)
    @JoinColumn({
        name: 'id'
    })
    ratings: Ratings[]

}