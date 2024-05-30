import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Operator, Sort } from '../types/query.types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FilterDto {
  @ApiProperty({ description: 'The field to filter on' })
  @IsString()
  field: string;

  @ApiProperty({ description: 'The value to compare against' })
  value: any;

  @ApiProperty({ description: 'The comparison operator' })
  @IsEnum(Operator)
  operator: string;
}

export class SortDto {
  @ApiProperty({ description: 'The field to sort by' })
  field: string;

  @ApiProperty({ description: 'The sort order (ASC or DESC)' })
  @IsEnum(Sort)
  order: string;
}

export class QueryDto {
  @ApiProperty({
    example: '0',
    description: 'the page to fetch from',
  })
  @IsNumberString()
  page: number;

  @ApiProperty({
    example: '3',
    description: 'the number of items to fetch',
  })
  @IsNumberString()
  limit: number;

  // @ApiProperty({
  //   type: [FilterDto],
  //   description: 'query filters',
  // })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters: FilterDto[];

  @ApiProperty({
    type: [SortDto],
    description: 'query sort',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sort: SortDto[];
}

export class PaginationDto {
  @IsNumberString()
  page: number;

  @IsNumberString()
  limit: number;
}
