import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './event.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepo: Repository<Event>,
    ) {}

    async create(createEventDto: CreateEventDto, user: User): Promise<any> {
        const event = this.eventRepo.create({ ...createEventDto, creator: user });
        return this.eventRepo.save(event);
    }
    
    async findAll() {
        return this.eventRepo.find();
    }

    async findOne(id: string) {
        return this.eventRepo.findOne({ where: { id }, relations: ['creator'] });
    }

    async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
        const event = await this.eventRepo.findOne({ where: { id }, relations: ['creator'] });
        if (!event || event.creator.id !== userId) { 
            throw new ForbiddenException('You are not allowed to update this event');
        }
        Object.assign(event, updateEventDto);
        return this.eventRepo.save(event);
    }

    async delete(id: string, userId: string) {
        const event = await this.eventRepo.findOne({ where: { id }, relations: ['creator'] });
        if (!event || event.creator.id !== userId) {
            throw new ForbiddenException('You are not allowed to delete this event');
        }
        return this.eventRepo.remove(event);
    }
}
