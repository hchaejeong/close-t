import { Repository } from 'typeorm';

import { Query } from 'src/utils/cqrs';
import { ClothesEntity } from '../../entities/clothes.entity';

export class GetClothesQuery extends Query<ClothesEntity | null> {
  constructor(public payload: Parameters<Repository<ClothesEntity>['findOne']>['0']) {
    super();
  }
}
