import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/event.entity';
import { Like, Repository } from 'typeorm';
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

        if (query.location) {
            qb.andWhere('event.location LIKE :location', { location: `%${query.location}%` });
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

}
