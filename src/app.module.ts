import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RsvpModule } from './rsvp/rsvp.module';
import { SearchModule } from './search/search.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [AuthModule, UsersModule, EventsModule, RsvpModule, SearchModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
