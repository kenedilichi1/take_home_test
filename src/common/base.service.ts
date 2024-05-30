import { Injectable } from '@nestjs/common';
import { EntitySchema, LessThan, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FilterDto, PaginationDto, SortDto } from './dto/query.dto';
import { ParseFilter } from '../utilities/parseFilter';
import { ParseSort } from '../utilities/parseSort';
import { ParsePagination } from '../utilities/parsePagination';

@Injectable()
export abstract class BaseService<T> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly alias: string,
  ) {}

  async findAndCount(): Promise<number> {
    const findAndCount = await this.repository.findAndCount();

    return findAndCount[1];
  }

  async insertMany(values: QueryDeepPartialEntity<T>[]) {
    await this.repository
      .createQueryBuilder(this.alias)
      .insert()
      .into(EntitySchema<T>)
      .values(values);

    return;
  }

  async fetchMany(
    filter: Array<FilterDto>,
    sort: Array<SortDto>,
    paginationData: PaginationDto,
  ) {
    const result = this.repository.createQueryBuilder(this.alias);

    const filterToQuery = ParseFilter(result, filter);
    const sortToQuery = ParseSort(filterToQuery, sort);
    const paginationToQuery = ParsePagination(sortToQuery, paginationData);

    const data = await paginationToQuery.getMany();

    const dataLength = data.length;

    let hasNextPage = dataLength > paginationData.limit ? true : false;
    let hasPrevPage = paginationData.page === 0 ? false : true;

    if (hasNextPage) {
      data.pop();
    }

    return { data, hasNextPage, hasPrevPage };
  }
}
