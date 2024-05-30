import { Controller, Get, Query } from '@nestjs/common';
// import { ItemsArrayDto } from '../dto/item.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// @Controller('items')
// export class ItemsController {
//   @Get()
//   async getItems(@Query() query: any): Promise<string> {
//     const itemsArrayDto = plainToInstance(ItemsArrayDto, query);
//     const errors = await validate(itemsArrayDto);
//     if (errors.length > 0) {
//       return Validation failed: ${errors};
//     }
//     // Handle the validated data here
//     return 'Items received successfully';
//   }
// }
