import { IIQeryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetClothesQuery } from '../impl/get-clothes.query';
import { ClothesRepository } from '../../repositories/clothes.repository';
import { ClothesEntity } from '../../entities/clothes.entity';

@QueryHandler(GetClothesQuery)
export class GetClothesHandler implements IIQeryHandler<GetClothesQuery> {
  constructor(private clothesRepository: ClothesRepository) {}

  execute(query: GetClothesQuery): Promise<ClothesEntity | null> {
    const { payload } = query;

    return this.clothesRepository.findOne(payload);
  }
}
