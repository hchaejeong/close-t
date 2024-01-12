import { Repository } from 'typeorm';

import { Query } from 'src/utils/cqrs';
import { UserEntity } from '../../entities/user.entity';

export class GetUserQuery extends Query<UserEntity | null> {
  constructor(public payload: Parameters<Repository<UserEntity>['findOne']>['0']) {
    super();
  }
}
