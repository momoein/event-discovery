import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ReverseGeocodeQueryDto, ReverseGeocodeResponseDto, GeocodeQueryDto, GeocodeResponseDto } from './location.dto';

@ApiTags('location')
@Controller('location')
export class LocationController {
    constructor(
        private readonly locationService: LocationService,
    ) { }

    @ApiOperation({ summary: 'Reverse geocode latitude and longitude to address' })
    @ApiQuery({ name: 'latitude', type: Number, example: 40.7128, description: 'Latitude for reverse geocoding' })
    @ApiQuery({ name: 'longitude', type: Number, example: -74.0060, description: 'Longitude for reverse geocoding' })
    @ApiResponse({ status: 200, description: 'Reverse geocoded address', type: ReverseGeocodeResponseDto })
    @Get('reverse-geocode')
    async reverseGeocode(
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
    ) {
        const addr = await this.locationService.reverseGeocode(latitude, longitude);
        const result = {
            cleanAddress: addr.cleanAddress,
            address: addr.address,
            latitude,
            longitude,
        };
        return result;
    }

    @ApiOperation({ summary: 'Geocode address to latitude and longitude' })
    @ApiQuery({ name: 'address', type: String, example: '123 Main St, City', description: 'Address to geocode' })
    @ApiResponse({ status: 200, description: 'Geocoded latitude and longitude', type: GeocodeResponseDto })
    @Get('geocode')
    async geocodeAddress(
        @Query('address') address: string,
    ) {
        const { latitude, longitude } = await this.locationService.geocodeAddress(address);
        const result = {
            address,
            latitude,
            longitude,
        };
        return result;
    }
}