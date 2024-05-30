import { IsArray, IsBoolean } from 'class-validator';
import { Room } from '../entity/room.emtity';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({
    type: [Room],
    description: 'list of rooms',
  })
  @IsArray()
  rooms: Array<Room>;

  @ApiProperty({
    example: true,
    description: 'check if a next page exists or not',
  })
  @IsBoolean()
  hasNextPage: boolean;

  @ApiProperty({
    example: true,
    description: 'check if a previous page exists or not',
  })
  @IsBoolean()
  hasPrevPage: boolean;
}
