import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDto, UpdateEventDto } from './event.dto';
import { UsersService } from 'src/users/users.service';
import { mapEventToResponseDto } from './event.mapper';

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly userService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createEventDto: CreateEventDto, @Request() req) {
        try {
            const user = await this.userService.findById(req.user.id);
            if (!user) {
                throw new Error('User not found');
            }
            const result = await this.eventsService.create(createEventDto, user);
            return mapEventToResponseDto(result);
        } catch (err) {
            console.error('Error in create event:', err);
            throw err;
        }
    }

    @Get()
    async findAll() {
        const result = await this.eventsService.findAll();
        return result.map(event => mapEventToResponseDto(event));
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }
        return mapEventToResponseDto(event);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateEventDto, @Request() req) {
        const result = await this.eventsService.update(id, dto, req.user.id);
        return mapEventToResponseDto(result);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        const result = await this.eventsService.delete(id, req.user.id);
        return mapEventToResponseDto(result);
    }
}
