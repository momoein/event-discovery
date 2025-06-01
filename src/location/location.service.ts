import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocationService {
    constructor(private readonly httpService: HttpService) { }

    async reverseGeocode(lat: number, lon: number) {
        const url = 'https://nominatim.openstreetmap.org/reverse';

        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    params: {
                        lat,
                        lon,
                        format: 'json',
                    },
                    headers: {
                        'User-Agent': 'event-discovery-api',
                        'Accept-Language': 'en',
                    },
                }),
            );

            const address = response.data.address;

            const {
                road,
                pedestrian,
                house_number,
                suburb,
                city,
                town,
                village,
                state,
                country,
            } = address;

            const cleanAddress = [
                country,
                state,
                city || town || village,
                suburb,
                road || pedestrian,
                house_number,
            ].filter(Boolean).join(', ');

            return { cleanAddress, address };
        } catch (error) {
            console.error('Reverse geocoding failed', error?.message || error);
            throw new Error('Unable to reverse geocode the coordinates.');
        }
    }

    async geocodeAddress(address: string): Promise<{ latitude: number; longitude: number }> {
        const url = 'https://nominatim.openstreetmap.org/search';

        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    params: {
                        q: address,
                        format: 'json',
                        limit: 1,
                    },
                    headers: {
                        'User-Agent': 'event-discovery-api',
                        'Accept-Language': 'en',
                    },
                }),
            );

            const data = response.data;

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('No results found for the given address.');
            }

            const location = data[0];

            return {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon),
            };
        } catch (error) {
            console.error('Geocoding failed:', error?.message || error);
            throw new Error('Unable to geocode the address.');
        }
    }

}
