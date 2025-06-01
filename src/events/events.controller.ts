import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventDto, EventResponseDto, UpdateEventDto } from './event.dto';
import { UsersService } from 'src/users/users.service';
import { mapEventToResponseDto } from './event.mapper';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly userService: UsersService,
    ) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiBody({ type: CreateEventDto })
    @ApiResponse({ status: 201, description: 'Event created', type: EventResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
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

    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of events', type: [EventResponseDto] })
    @Get()
    async findAll() {
        const result = await this.eventsService.findAll();
        return result.map(event => mapEventToResponseDto(event));
    }

    @ApiOperation({ summary: 'Get event by ID' })
    @ApiParam({ 
        name: 'id', 
        description: 'Event ID (UUID)', 
        example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', 
        type: 'string', 
        format: 'uuid' 
    })
    @ApiResponse({ status: 200, description: 'Event found', type: EventResponseDto })
    @ApiResponse({ status: 404, description: 'Event not found' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }
        return mapEventToResponseDto(event);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an event' })
    @ApiParam({ 
        name: 'id', 
        description: 'Event ID (UUID)', 
        example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', 
        type: 'string', 
        format: 'uuid' 
    })
    @ApiBody({ type: UpdateEventDto })
    @ApiResponse({ status: 200, description: 'Event updated', type: EventResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateEventDto, @Request() req) {
        const result = await this.eventsService.update(id, dto, req.user.id);
        return mapEventToResponseDto(result);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete an event' })
    @ApiParam({ 
        name: 'id', 
        description: 'Event ID (UUID)', 
        example: 'b3b8c7e2-8c3d-4e7a-9b2e-2e8c7e2b3b8c', 
        type: 'string', 
        format: 'uuid' 
    })
    @ApiResponse({ status: 200, description: 'Event deleted', type: EventResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        const result = await this.eventsService.delete(id, req.user.id);
        return mapEventToResponseDto(result);
    }
}