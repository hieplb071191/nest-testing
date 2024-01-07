import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "./posts.entity";
import { Users } from "./users.entity";

@Entity({
    name: 'comments'
})
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'uuid',
        nullable: false
    })
    postId: string;

    @Column({
        type: 'uuid',
        nullable: false
    })
    userId: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    parrentId: string;

    @Column({
        type: String,
        nullable: false
    })
    content: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @ManyToOne(() => Posts, post => post.comments)
    @JoinColumn({
        name: 'postId'
    })
    post: Posts

    @ManyToOne(() => Users, user => user.comments)
    @JoinColumn({
        name: 'userId'
    })
    user: Users

}