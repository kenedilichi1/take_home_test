export enum FilterOperators {
  lt = '<',
  gte = '>=',
  equals = '=',
  not = '!=',
  gt = '>',
  lte = '<=',
  like = 'LIKE',
  in = 'IN',
  notIn = 'NOT IN',
  isNotNull = 'IS NOT NULL',
  isNull = 'IS NULL',
}
export type filterOperators = typeof FilterOperators;
