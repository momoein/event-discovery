import { forwardRef, Module } from '@nestjs/common';
import { RsvpController } from './rsvp.controller';
import { RsvpService } from './rsvp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RSVP } from './rsvp.entity';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RSVP]),
        forwardRef(() => UsersModule),
        forwardRef(() => EventsModule),
    ],
    controllers: [RsvpController],
    providers: [RsvpService]
})
export class RsvpModule { }
