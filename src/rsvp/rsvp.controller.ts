import { Controller, Post, Delete, Param, Body, UseGuards, Request, Get, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RsvpService } from './rsvp.service';
import { RSVPStatus } from './rsvp.entity';
import { EventsService } from 'src/events/events.service';

@Controller('rsvp')
export class RsvpController {
  constructor(
    private rsvpService: RsvpService,
    private eventsService: EventsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':eventId')
  async createOrUpdate(
    @Param('eventId') eventId: string,
    @Body('status') status: RSVPStatus,
    @Request() req,
  ) {
    const user = req.user;
    const event = await this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');
    const rsvp = await this.rsvpService.createOrUpdate(user, event, status);
    return {
      id: rsvp.id,
      userId: rsvp.user.id,
      eventId: rsvp.event.id,
      status: rsvp.status,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':eventId')
  async remove(@Param('eventId') eventId: string, @Request() req) {
    const user = req.user;
    return this.rsvpService.deleteByUserAndEvent(user, eventId);
  }

  @Get(':eventId/going-count')
  async countGoing(@Param('eventId') eventId: string) {
    return {
      goingCount: await this.rsvpService.countGoing(eventId),
    };
  }
}
