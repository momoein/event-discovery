import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../events/event.entity';
import { RSVP } from '../rsvp/rsvp.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Event, (event) => event.creator)
    events: Event[];

    @OneToMany(() => RSVP, rsvp => rsvp.user)
    rsvps: RSVP[];
}