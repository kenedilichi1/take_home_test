import { SelectQueryBuilder } from 'typeorm';

export function ParsePagination<T>(
  repository: SelectQueryBuilder<T>,
  //   TODO:add type for pagination data
  paginationData: Record<string, any>,
) {
  const repo = repository;
  const skip = paginationData.page * paginationData.limit;

  repo.skip(skip);
  repo.limit(paginationData.limit + 1);

  return repo;
}
