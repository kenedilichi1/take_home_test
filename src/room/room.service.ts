import { Injectable, OnModuleInit } from '@nestjs/common';
import { Room } from './entity/room.emtity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { rooms } from '../common/room.data';
import { BaseService } from '../common/base.service';
import { QueryDto } from '../common/dto/query.dto';
import { RoomDto } from './dto/rooms.dto';

@Injectable()
export class RoomService extends BaseService<Room> implements OnModuleInit {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {
    super(roomRepository, 'room');
  }

  async onModuleInit() {
    console.log('here');
    const checkDb = await this.findAndCount();

    if (checkDb[1] === 0) {
      await this.insertMany(rooms);

      return;
    }

    return;
  }

  async getRooms(query: QueryDto): Promise<RoomDto> {
    console.log(query);
    const { data, ...rest } = await this.fetchMany(query.filters, query.sort, {
      page: query.page,
      limit: query.limit,
    });

    return { rooms: data, ...rest };
  }
}
