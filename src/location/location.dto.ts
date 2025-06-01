import { ApiProperty } from '@nestjs/swagger';

export class ReverseGeocodeQueryDto {
    @ApiProperty({ example: 40.7128, description: 'Latitude for reverse geocoding' })
    latitude: number;

    @ApiProperty({ example: -74.0060, description: 'Longitude for reverse geocoding' })
    longitude: number;
}

export class ReverseGeocodeResponseDto {
    @ApiProperty({
        example: 'USA, New York, New York, Manhattan, 5th Avenue, 350',
        description: 'Cleaned address (country, state, city/town/village, suburb, road/pedestrian, house_number)',
    })
    cleanAddress: string;

    @ApiProperty({
        example: {
            address: {
                office: "Empire State Building",
                house_number: "350",
                road: "5th Avenue",
                neighbourhood: "Midtown South",
                borough: "Manhattan",
                county: "New York County",
                city: "New York",
                state: "New York",
                "ISO3166-2-lvl4": "US-NY",
                postcode: "10118",
                country: "United States",
                country_code: "us"
            }
        },
        description: 'Full address as returned by geocoding provider',
    })
    address: object;

    @ApiProperty({ example: 40.7128, description: 'Latitude' })
    latitude: number;

    @ApiProperty({ example: -74.0060, description: 'Longitude' })
    longitude: number;
}

export class GeocodeQueryDto {
    @ApiProperty({ example: '350 5th Avenue, Manhattan, New York, NY, USA', description: 'Address to geocode' })
    address: string;
}

export class GeocodeResponseDto {
    @ApiProperty({ example: '350 5th Avenue, Manhattan, New York, NY, USA', description: 'Address' })
    address: string;

    @ApiProperty({ example: 40.7484, description: 'Latitude' })
    latitude: number;

    @ApiProperty({ example: -73.9857, description: 'Longitude' })
    longitude: number;
}