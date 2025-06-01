import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    location: string;

    @Column({ type: "datetime" })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.events, { eager: true })
    creator: User;
}