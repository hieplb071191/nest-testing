import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users.entity";
import { Comments } from "./comments.entity";

@Entity({
    name: 'posts'
})
export class Posts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'uuid',
        nullable: false
    })
    userId: string;

    @Column({
        type: String,
        nullable: false
    })
    title: string;

    @Column({
        type: String,
        nullable: false
    })
    content: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        type: Date
    })
    deleteAt: Date;

    @ManyToOne(() => Users, (user) => user.posts)
    @JoinColumn({
        name: 'userId'
    })
    user: Users;

    @OneToMany(() => Comments, (comments) => comments.post)
    @JoinColumn({
        name: 'postId'
    })
    comments: Comments[]
}