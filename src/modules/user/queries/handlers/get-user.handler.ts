import { IIQeryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';


@QueryHandler(GetUserQuery)
export class GetUserHandler implements IIQeryHandler<GetUserQuery> {
  constructor(private userRepository: UserRepository) {}

  execute(query: GetUserQuery): Promise<UserEntity | null> {
    const { payload } = query;

    return this.userRepository.findOne(payload);
  }
}
