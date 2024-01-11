import { Injectable } from '@nestjs/common';
import { ClothesRepository } from '../repositories/clothes.repository';
import { Category, ClothesEntity, Tag } from '../entities/clothes.entity';

@Injectable()
export class ClothesService {
    constructor(private clothesRepository: ClothesRepository) {}

    async getClothesByCategory(args: { category: Category }): Promise<ClothesEntity[]> {
        const { category } = args;

        const clothes = await this.clothesRepository.find({
            where: {
                category,
            },
        });

        return clothes;
    }

    async filterClothesByTag(args: { tag: Tag }): Promise<ClothesEntity[]> {
        const { tag } = args;
        const clothes = await this.clothesRepository.find({
            where: {
                tag,
            },
        });

        return clothes;
    }

    async getSelectedClothes(args: { id: string }): Promise<ClothesEntity> {
        const { id } = args;
        const selectedClothes = await this.clothesRepository.findOne({
            where: {
                id,
            },
        });

        return selectedClothes;
    }
}
