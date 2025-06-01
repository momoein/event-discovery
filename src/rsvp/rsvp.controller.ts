import { Controller, Post, Delete, Param, Body, UseGuards, Request, Get, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RsvpService } from './rsvp.service';
import { EventsService } from 'src/events/events.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RsvpRequestDto, RsvpResponseDto, GoingCountResponseDto } from './rsvp.dto';

@ApiTags('rsvp')
@Controller('rsvp')
export class RsvpController {
  constructor(
    private rsvpService: RsvpService,
    private eventsService: EventsService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or update RSVP for an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID (UUID)', example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', type: 'string', format: 'uuid' })
  @ApiBody({ type: RsvpRequestDto })
  @ApiResponse({ status: 201, description: 'RSVP created or updated', type: RsvpResponseDto })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @UseGuards(JwtAuthGuard)
  @Post(':eventId')
  async createOrUpdate(
    @Param('eventId') eventId: string,
    @Body() body: RsvpRequestDto,
    @Request() req,
  ) {
    const user = req.user;
    const event = await this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');
    const rsvp = await this.rsvpService.createOrUpdate(user, event, body.status);
    return {
      id: rsvp.id,
      userId: rsvp.user.id,
      eventId: rsvp.event.id,
      status: rsvp.status,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove RSVP for an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID (UUID)', example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'RSVP removed' })
  @UseGuards(JwtAuthGuard)
  @Delete(':eventId')
  async remove(@Param('eventId') eventId: string, @Request() req) {
    const user = req.user;
    return this.rsvpService.deleteByUserAndEvent(user, eventId);
  }

  @ApiOperation({ summary: 'Get number of users going to an event' })
  @ApiParam({ name: 'eventId', description: 'Event ID (UUID)', example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Number of users going', type: GoingCountResponseDto })
  @Get(':eventId/going-count')
  async countGoing(@Param('eventId') eventId: string) {
    return {
      goingCount: await this.rsvpService.countGoing(eventId),
    };
  }
}