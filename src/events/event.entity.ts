import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "../users/user.entity";
import { RSVP } from "../rsvp/rsvp.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    address: string;

    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;

    @Column({ type: "timestamp" })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.events, { eager: true })
    creator: User;

    @OneToMany(() => RSVP, rsvp => rsvp.event)
    rsvps: RSVP[];
}