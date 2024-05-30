import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/entity/room.emtity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'room_user',
      password: 'room_password',
      database: 'room_db',
      entities: [Room],
      synchronize: true,
    }),
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
