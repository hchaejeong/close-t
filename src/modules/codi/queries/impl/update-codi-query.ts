import { Query } from 'src/utils/cqrs';
import { DeepPartial, UpdateResult } from 'typeorm';
import { CodiEntity } from '../../entities/codi.entity';


export class UpdateCodiQuery extends Query<UpdateResult> {
  constructor(public readonly codiId: string, public readonly payload: DeepPartial<CodiEntity>) {
    super();
  }
}
