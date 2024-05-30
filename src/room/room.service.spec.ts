import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entity/room.emtity';
import { BaseService } from 'src/common/base.service';
import { QueryBuilder } from 'typeorm';
import { RoomDto } from './dto/rooms.dto';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useValue: {
            fetchMany: jest.fn().mockImplementation(),
          },
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const query = {
    page: 0,
    limit: 3,
    filters: [{ field: 'capacity', value: 10, operator: 'lt' }],
    sort: [{ field: 'capacity', order: 'ASC' }],
  };

  jest.mock('typeorm', () => ({
    // ... other mocks
    QueryBuilder: jest.fn().mockImplementation(() => ({
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(query),
      // Mock other query builder methods as needed
    })),
  }));

  it('should get rooms with query data', async () => {
    jest.spyOn(service, 'getRooms').mockReturnValue(
      Promise.resolve({
        rooms: [{ id: 1, capacity: 10, userId: 1, name: 'room' }],
        hasPrevPage: true,
        hasNextPage: true,
      }),
    );

    const result = await service.getRooms(query);
    console.log(result);
    expect(result).toHaveLength(0);
  });
});
