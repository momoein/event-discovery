import { Controller, Get, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(
        private readonly locationService: LocationService,
    ) { }

    @Get('reverse-geocode')
    async reverseGeocode(
        @Query('latitude') Latitude: number,
        @Query('longitude') Longitude: number,
    ) {
        const addr = await this.locationService.reverseGeocode(Latitude, Longitude);
        const result = {
            cleanAddress: addr.cleanAddress,
            address: addr.address,
            latitude: Latitude,
            longitude: Longitude,
        };
        return result;
    }

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
