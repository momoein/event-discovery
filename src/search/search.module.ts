import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
