import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';


export class CreateEventDto {
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  date: Date;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}


export class EventResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ required: false })
  creatorUsername?: string;
}
