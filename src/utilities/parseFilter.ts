import { FilterDto } from '../common/dto/query.dto';
import { FilterOperators } from '../common/types/filter.type';
import { SelectQueryBuilder } from 'typeorm';

export function ParseFilter<T>(
  repository: SelectQueryBuilder<T>,
  filters: Array<FilterDto | null>,
): SelectQueryBuilder<T> {
  try {
    const repo = repository;
    const filterLength = filters.length;

    if (filterLength !== 0) {
      filters.forEach((filter) => {
        const { field, value, operator } = filter;
        const filterOperator = FilterOperators[operator];

        repo.andWhere(`${field} ${filterOperator} :${field}`, {
          [field]: value,
        });
      });

      return repo;
    }
  } catch (error) {
    console.log(error);
  }
}
