import { IQuery } from '@nestjs/cqrs';

export class Query<T> implements IQuery {
  private __resultType!: T;
}

export type QueryResult<T extends Query<unknown>> = T extends Query<infer R> ? R : never;
