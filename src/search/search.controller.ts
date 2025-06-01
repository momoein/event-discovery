import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchEventDto } from './dto/search-event.dto';
import { mapEventToResponseDto } from 'src/events/event.mapper';

@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
    ) { }

    @Get('events')
    async search(@Query() query: SearchEventDto) {
        const result = await this.searchService.searchEvents(query);
        return result.map(event => mapEventToResponseDto(event));
    }

    @Get('events/nearby')
    async findNearbyEvents(
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
        @Query('radius') radius: number = 5, // Default radius of 5 km
    ) {
        const events = await this.searchService.findNearbyEvents(latitude, longitude, radius);
        return events.map(event => mapEventToResponseDto(event));
    }
}
