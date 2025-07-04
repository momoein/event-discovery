import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/event.entity';
import { Repository } from 'typeorm';
import { SearchEventDto } from './dto/search-event.dto';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepo: Repository<Event>,
    ) { }

    async searchEvents(query: SearchEventDto): Promise<Event[]> {
        const qb = this.eventRepo.createQueryBuilder('event');

        if (query.name) {
            qb.andWhere('event.name LIKE :name', { name: `%${query.name}%` });
        }

        if (query.address) {
            qb.andWhere('event.address LIKE :address', { address: `%${query.address}%` });
        }

        if (query.startDate && query.endDate) {
            qb.andWhere('event.date BETWEEN :startDate AND :endDate', {
                startDate: query.startDate,
                endDate: query.endDate,
            });
        } else if (query.startDate) {
            qb.andWhere('event.date >= :startDate', { startDate: query.startDate });
        } else if (query.endDate) {
            qb.andWhere('event.date <= :endDate', { endDate: query.endDate });
        }

        // Sorting
        if (query.sortBy) {
            qb.orderBy(`event.${query.sortBy}`, query.sortOrder ?? 'ASC');
        }

        // Pagination
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        qb.skip((page - 1) * limit).take(limit);

        return qb.getMany();
    }

    async findNearbyEvents(latitude: number, longitude: number, radius: number): Promise<Event[]> {
        const qb = this.eventRepo.createQueryBuilder('event');

        // Calculate the bounding box for the search radius
        const earthRadius = 6371; // Earth radius in kilometers
        const latDelta = radius / earthRadius;
        const lonDelta = radius / (earthRadius * Math.cos((latitude * Math.PI) / 180));

        const minLat = latitude - (latDelta * 180) / Math.PI;
        const maxLat = latitude + (latDelta * 180) / Math.PI;
        const minLon = longitude - (lonDelta * 180) / Math.PI;
        const maxLon = longitude + (lonDelta * 180) / Math.PI;

        qb.where('event.latitude BETWEEN :minLat AND :maxLat', { minLat, maxLat })
          .andWhere('event.longitude BETWEEN :minLon AND :maxLon', { minLon, maxLon });

        return qb.getMany();
    }

}
