import { IIQeryHandler, QueryHandler } from '@nestjs/cqrs';

import { CodiRepository } from '../../repositories/codi.repository';
import { CodiEntity } from '../../entities/codi.entity';
import { GetCodiesQuery } from '../impl/get-codies.query';

@QueryHandler(GetCodiesQuery)
export class GetCodiesHandler implements IIQeryHandler<GetCodiesQuery> {
  constructor(private codiRepository: CodiRepository) {}

  execute(query: GetCodiesQuery): Promise<CodiEntity[]> {
    const { payload } = query;

    return this.codiRepository.find(payload);
  }
}
