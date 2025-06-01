import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchEventDto } from './dto/search-event.dto';
import { mapEventToResponseDto } from 'src/events/event.mapper';
import { EventResponseDto } from 'src/events/event.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
    ) { }

    @ApiOperation({ summary: 'Search for events by filters' })
    @ApiResponse({ status: 200, description: 'List of events matching search criteria', type: [EventResponseDto] })
    @Get('events')
    async search(@Query() query: SearchEventDto) {
        const result = await this.searchService.searchEvents(query);
        return result.map(event => mapEventToResponseDto(event));
    }

    @ApiOperation({ summary: 'Find nearby events by coordinates and radius' })
    @ApiQuery({ name: 'latitude', type: Number, example: 40.7128, description: 'Latitude for nearby search' })
    @ApiQuery({ name: 'longitude', type: Number, example: -74.0060, description: 'Longitude for nearby search' })
    @ApiQuery({ name: 'radius', type: Number, example: 5, required: false, description: 'Radius in kilometers (default: 5)' })
    @ApiResponse({ status: 200, description: 'List of nearby events', type: [EventResponseDto] })
    @Get('events/nearby')
    async findNearbyEvents(
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
        @Query('radius') radius: number = 5,
    ) {
        const events = await this.searchService.findNearbyEvents(latitude, longitude, radius);
        return events.map(event => mapEventToResponseDto(event));
    }
}