import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Meetup', description: 'Name of the event' })
  name: string;

  @ApiPropertyOptional({ example: 'A meetup for tech enthusiasts', description: 'Description of the event' })
  description?: string;

  @ApiProperty({ example: '123 Main St, City', description: 'Event address' })
  address: string;

  @ApiProperty({ example: 40.7128, description: 'Latitude of the event location' })
  latitude: number;

  @ApiProperty({ example: -74.0060, description: 'Longitude of the event location' })
  longitude: number;

  @ApiProperty({ example: '2025-06-01T18:00:00.000Z', description: 'Date and time of the event (ISO 8601)' })
  date: Date;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}

export class EventResponseDto {
  @ApiProperty({ example: '1', description: 'Unique identifier for the event' })
  id: string;

  @ApiProperty({ example: 'Tech Meetup', description: 'Name of the event' })
  name: string;

  @ApiPropertyOptional({ example: 'A meetup for tech enthusiasts', description: 'Description of the event' })
  description?: string;

  @ApiProperty({ example: '123 Main St, City', description: 'Event address' })
  address: string;

  @ApiProperty({ example: 40.7128, description: 'Latitude of the event location' })
  latitude: number;

  @ApiProperty({ example: -74.0060, description: 'Longitude of the event location' })
  longitude: number;

  @ApiProperty({ example: '2025-06-01T18:00:00.000Z', description: 'Date and time of the event (ISO 8601)' })
  date: Date;

  @ApiPropertyOptional({ example: 'johndoe', description: 'Username of the event creator' })
  creatorUsername?: string;
}
