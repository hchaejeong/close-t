import { Injectable } from '@nestjs/common';
import { ClothesRepository } from '../repositories/clothes.repository';
import { Category, ClothesEntity, Tag } from '../entities/clothes.entity';
import { StringResponseDto } from 'src/modules/codi/dtos/string-response.dto';
import { ILike } from 'typeorm';
import { QueryBus } from '@nestjs/cqrs';
import { GetCodiesQuery } from 'src/modules/codi/queries/impl/get-codies.query';
import { UpdateCodiQuery } from 'src/modules/codi/queries/impl/update-codi-query';

@Injectable()
export class ClothesService {
    constructor(private clothesRepository: ClothesRepository, private queryBus: QueryBus) {}

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

    async likeOrDislikeClothes(args: { clothesId: string, userId: string }): Promise<StringResponseDto> {
        const { clothesId, userId } = args;
        const selectedClothes = await this.clothesRepository.findOne({
            where: {
                id: clothesId, 
                userId
            },
        });

        if (!selectedClothes) {
            return { result: 'Clothes is not found' };
        }

        const currentTags = selectedClothes.tag || [];
        if (currentTags.includes(Tag.Like)) {
            // If Like tag exists, remove it
            const updatedTags = currentTags.filter(tag => tag !== Tag.Like);
            await this.clothesRepository.update(clothesId, { tag: updatedTags });
            return { result: 'Like has been removed' };
        } else {
            // If Like tag does not exist, add it
            currentTags.push(Tag.Like);
            await this.clothesRepository.update(clothesId, { tag: currentTags });
            return { result: 'Like has been added' };
        }
    }

    async trashOrRestoreClothes(args: { clothesId: string, userId: string }): Promise<StringResponseDto> {
        const { clothesId, userId } = args;
        const selectedClothes = await this.clothesRepository.findOne({
            where: {
                id: clothesId,
                userId,
            },
        });

        if (!selectedClothes) {
            // Handle case where clothes with given id and userId is not found
            return { result: 'Clothes not found' };
        }

        const currentTags = selectedClothes.tag || [];
        
        if (currentTags.includes(Tag.Trash)) {
            const updatedTags = currentTags.filter(tag => tag !== Tag.Trash);
            await this.clothesRepository.update(clothesId, { tag: updatedTags });
            return { result: 'Trash tag has been removed' };
        } else {
            currentTags.push(Tag.Trash);
            await this.clothesRepository.update(clothesId, { tag: currentTags });
            return { result: 'Trash tag added' };
        }
    }

    async removeFromWish(args: { clothesId: string, userId: string }): Promise<StringResponseDto> {
        const { clothesId, userId } = args;
        const selectedClothes = await this.clothesRepository.findOne({
            where: {
                id: clothesId,
                userId,
            },
        });

        if (!selectedClothes) {
            // Handle case where clothes with given id and userId is not found
            return { result: 'Clothes not found' };
        }

        const currentTags = selectedClothes.tag || [];
        
        if (currentTags.includes(Tag.Wish)) {
            const updatedTags = currentTags.filter(tag => tag !== Tag.Wish);
            await this.clothesRepository.update(clothesId, { tag: updatedTags });
            return { result: 'Clothes has been removed from wish list' };
        } else {

            return { result: 'This clothes is already not in wish list' };
        }
    }

    async removeClothes(args: { clothesId: string, userId: string }): Promise<StringResponseDto> {
        const { clothesId, userId } = args;
        const clothesToBeRemoved = await this.clothesRepository.findOne({
            where: { id: clothesId, userId },
            relations: ['user'],
        });

        if (!clothesToBeRemoved) {
            return { result: 'This clothes is not found' };
        }

        const clothesImage = clothesToBeRemoved.imageUrl;
        await this.clothesRepository.remove(clothesToBeRemoved);

        const relatedCodiEntities = await this.queryBus.execute(
            new GetCodiesQuery({
                where: {
                    userId,
                    clothesIds: ILike(`%${clothesId}%`),
                    clothesImages: ILike(`%${clothesImage}%`),
                },
            }),
        );

        if (relatedCodiEntities.length > 0) {
            await Promise.all(
                relatedCodiEntities.map(async (codiEntity) => {
                    // Update the clothesIds and clothesImages arrays by removing the specified values
                    const updatedCodi = {
                        clothesIds: codiEntity.clothesIds.filter((id) => id !== clothesId),
                        clothesImages: codiEntity.clothesImages.filter((image) => image !== clothesImage),
                    };
    
                    await this.queryBus.execute(
                        new UpdateCodiQuery(codiEntity.id, updatedCodi),
                    );
                }),
            );
        }

        return { result: 'Clothes has been removed from database and from related codies' };
    }
}
