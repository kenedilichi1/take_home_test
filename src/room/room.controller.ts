import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { FilterDto, QueryDto, SortDto } from 'src/common/dto/query.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomDto } from './dto/rooms.dto';
import {
  Filtering,
  FilteringParams,
} from 'src/common/decorators/filters.decorator';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@ApiTags('rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: RoomDto,
  // })
  // @ApiQuery({ name: 'page', required: false, type: Number })
  // @ApiQuery({ name: 'limit', required: false, type: Number })
  // @ApiQuery({ name: 'sort[]', required: false, type: [SortDto] })
  async getRooms(
    @Query() query: any,
    // @FilteringParams(['name', 'id', 'stateId']) filters: Filtering,
  ) {
    const itemsArrayDto = plainToInstance(QueryDto, query);
    const errors = await validate(itemsArrayDto);
    console.log(itemsArrayDto, 'query');
    return this.roomService.getRooms(query);
  }
}
