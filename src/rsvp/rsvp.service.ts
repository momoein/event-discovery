import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RSVP, RSVPStatus } from './rsvp.entity';
import { User } from 'src/users/user.entity';
import { Event } from 'src/events/event.entity';

@Injectable()
export class RsvpService {
  constructor(
    @InjectRepository(RSVP)
    private rsvpRepo: Repository<RSVP>,
  ) {}

  async createOrUpdate(user: User, event: Event, status: RSVPStatus): Promise<RSVP> {
    let rsvp = await this.rsvpRepo.findOne({ where: { user: { id: user.id }, event: { id: event.id } } });
    if (rsvp) {
      rsvp.status = status;
      console.log(`Updating RSVP for user ${user.id} and event ${event.id} to status ${status}`);
    } else {
      rsvp = this.rsvpRepo.create({ user, event, status });
      console.log(`Creating new RSVP for user ${user.id} and event ${event.id} with status ${status}`);
    }
    return this.rsvpRepo.save(rsvp);
  }

  async getByUserAndEvent(user: User, eventId: string): Promise<RSVP | null> {
    return this.rsvpRepo.findOne({
      where: { user: { id: user.id }, event: { id: eventId } },
    });
  }

  async deleteByUserAndEvent(user: User, eventId: string): Promise<void> {
    const rsvp = await this.getByUserAndEvent(user, eventId);
    if (!rsvp) {
      throw new NotFoundException('RSVP not found');
    }
    if (rsvp.user.id !== user.id) {
      throw new ForbiddenException('Not allowed to delete this RSVP');
    }
    await this.rsvpRepo.remove(rsvp);
  }

  async countGoing(eventId: string): Promise<number> {
    return this.rsvpRepo.count({
      where: { event: { id: eventId }, status: RSVPStatus.GOING },
    });
  }
}
