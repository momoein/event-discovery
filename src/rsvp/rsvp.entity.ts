import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';

export enum RSVPStatus {
    GOING = 'going',
    NOT_GOING = 'not_going',
    MAYBE = 'maybe',
}

@Entity()
@Unique(['user', 'event'])
export class RSVP {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.rsvps, { eager: true })
    user: User;

    @ManyToOne(() => Event, event => event.rsvps, { eager: true, onDelete: 'CASCADE' })
    event: Event;

    @Column({
        type: 'enum',
        enum: RSVPStatus,
        default: RSVPStatus.MAYBE,
    })
    status: RSVPStatus;
}
