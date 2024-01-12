import { Injectable } from '@nestjs/common';
import { ClothesRepository } from '../repositories/clothes.repository';
import { Category, ClothesEntity, Tag } from '../entities/clothes.entity';

@Injectable()
export class ClothesService {
    constructor(private clothesRepository: ClothesRepository) {}

    async getClothesByCategory(args: { category: Category, userId: string }): Promise<ClothesEntity[]> {
        const { category, userId } = args;

        const clothes = await this.clothesRepository.find({
            where: {
                category,
                userId,
            },
        });

        return clothes;
    }

    async filterClothesByTag(args: { tag: Tag, category: Category, userId: string }): Promise<ClothesEntity[]> {
        const { tag, category, userId } = args;
        const clothes = await this.clothesRepository.find({
            where: {
                tag,
                category,
                userId,
            },
        });

        return clothes;
    }

    async getSelectedClothes(args: { id: string, userId: string }): Promise<ClothesEntity> {
        const { id, userId } = args;
        const selectedClothes = await this.clothesRepository.findOne({
            where: {
                id,
                userId,
            },
        });

        return selectedClothes;
    }
}
