import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RsvpModule } from './rsvp/rsvp.module';
import { SearchModule } from './search/search.module';
import { LocationModule } from './location/location.module';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Event } from './events/event.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
      logging: true, // Enable logging for debugging
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    RsvpModule,
    SearchModule,
    LocationModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {
  //   console.log('Entities:', this.dataSource.entityMetadatas.map(meta => meta.name));
  // }
}
