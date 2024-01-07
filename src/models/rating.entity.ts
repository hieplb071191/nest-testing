import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";


@Entity({
    name: 'ratings'
})
export class Ratings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    userId: string;

    @Column({
        type: 'uuid',
    })
    postId: string;


    @Column({
        type: 'uuid',
    })
    commentId: string;


    @Column({
        type: 'enum',
        enum: ['post', 'comment']
    })
    ratingFor: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: 'int',
        nullable: false
    })
    amount: number

    @ManyToOne((type) => Users, (user) => user.ratings)
    @JoinColumn({
        name: 'userId'
    })
    user: Users
}