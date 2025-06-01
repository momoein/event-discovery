import { Type } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class SearchEventDto {
    @ApiPropertyOptional({ description: 'Event name to search for', example: 'Tech Meetup' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Event address to search for', example: '123 Main St, City' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ description: 'Start date (ISO 8601)', example: '2025-06-01T00:00:00.000Z' })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({ description: 'End date (ISO 8601)', example: '2025-06-30T23:59:59.000Z' })
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiPropertyOptional({ description: 'Page number for pagination', example: 1, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({ description: 'Number of results per page', example: 10, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @ApiPropertyOptional({ description: 'Sort by field', example: 'date' })
    @IsOptional()
    @IsString()
    sortBy?: string; // e.g. 'date'

    @ApiPropertyOptional({ description: 'Sort order', example: 'ASC', enum: ['ASC', 'DESC'] })
    @IsOptional()
    @IsString()
    sortOrder?: 'ASC' | 'DESC';
}