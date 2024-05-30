import { SelectQueryBuilder } from 'typeorm';
import { SortDto } from '../../src/common/dto/query.dto';
import { Sort } from '../common/types/query.types';

export function ParseSort<T>(
  repository: SelectQueryBuilder<T>,
  sorts: Array<SortDto>,
) {
  const repo = repository;
  const sortLength = sorts.length;

  if (sortLength < 1) {
    sorts.forEach((sort) => {
      const { field, order } = sort;
      repo.orderBy(`${field}`, order as Sort);
    });
  }

  return repo;
}
