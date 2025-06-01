import { Event } from './event.entity';
import { EventResponseDto } from './event.dto';

export function mapEventToResponseDto(event: Event): EventResponseDto {
    return {
        id: event.id,
        name: event.name,
        description: event.description,
        address: event.address,
        latitude: event.latitude,
        longitude: event.longitude,
        date: event.date,
        creatorUsername: event.creator?.username,
    };
}
