import { IIQeryHandler, QueryHandler } from '@nestjs/cqrs';
import { UpdateResult } from 'typeorm';

import { UpdateCodiQuery } from '../impl/update-codi-query';
import { CodiRepository } from '../../repositories/codi.repository';

@QueryHandler(UpdateCodiQuery)
export class UpdateCodiHandler implements IIQeryHandler<UpdateCodiQuery> {
  constructor(private codiRepository: CodiRepository) {}

  execute(query: UpdateCodiQuery): Promise<UpdateResult> {
    const { codiId, payload } = query;

    return this.codiRepository.update(codiId, payload);
  }
}
