import { ApiProperty } from '@nestjs/swagger';
import { RSVPStatus } from './rsvp.entity';

export class RsvpRequestDto {
  @ApiProperty({ enum: ['going', 'maybe', 'not_going'], description: 'RSVP status' })
  status: RSVPStatus;
}

export class RsvpResponseDto {
  @ApiProperty({ description: 'RSVP ID', example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'User ID', example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', type: 'string', format: 'uuid'})
  userId: string;

  @ApiProperty({ description: 'Event ID', example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', type: 'string', format: 'uuid' })
  eventId: string;

  @ApiProperty({ enum: ['GOING', 'INTERESTED', 'NOT_GOING'], description: 'RSVP status' })
  status: RSVPStatus;
}

export class GoingCountResponseDto {
  @ApiProperty({ example: 42, description: 'Number of users going to the event' })
  goingCount: number;
}