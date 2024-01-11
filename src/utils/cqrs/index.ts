import { IQueryHandler } from '@nestjs/cqrs';

import { Query } from './query';

declare module '@nestjs/cqrs/dist/query-bus' {
  export interface QueryBus {
    execute<T>(query: Query<T>): Promise<T>;
  }

  export type IIQeryHandler<QueryType extends Query<unknown>> = QueryType extends Query<infer ResultType>
    ? IQueryHandler<QueryType, ResultType>
    : never;
}

export { Query };

export * from '@nestjs/cqrs';
