import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';


export class CreateEventDto {
  name: string;
  description?: string;
  location: string;
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
  location: string;

  @ApiProperty()
  date: Date;

  // اگر میخوایید اطلاعاتی از سازنده رو بفرستید:
  @ApiProperty({ required: false })
  creatorUsername?: string;
}
