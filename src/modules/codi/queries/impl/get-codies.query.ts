import { Repository } from 'typeorm';
import { CodiEntity } from '../../entities/codi.entity';
import { Query } from 'src/utils/cqrs';

export class GetCodiesQuery extends Query<CodiEntity[]> {
  constructor(public payload: Parameters<Repository<CodiEntity>['find']>[0]) {
    super();
  }
}
