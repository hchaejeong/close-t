import { Injectable } from '@nestjs/common';
import { ClothesRepository } from '../repositories/clothes.repository';
import { Category, ClothesEntity } from '../entities/clothes.entity';
import { StringResponseDto } from 'src/modules/codi/dtos/string-response.dto';
import { ILike } from 'typeorm';
import { QueryBus } from '@nestjs/cqrs';
import { GetCodiesQuery } from 'src/modules/codi/queries/impl/get-codies.query';
import { UpdateCodiQuery } from 'src/modules/codi/queries/impl/update-codi-query';
import { Styles } from 'src/modules/user/entities/user.entity';
import { GetUserQuery } from 'src/modules/user/queries/impl/get-user.query';

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

    async getLikedClothes(args: { id: string, category: Category }): Promise<ClothesEntity[]> {
        const { id, category } = args;
        const likedClothes = await this.clothesRepository.find({
            where: {
                like: 'Like',
                category,
                userId: id,
            },
        });

        return likedClothes;
    }

    async getTrashedClothes(args: { id: string, category: Category }): Promise<ClothesEntity[]> {
        const { id, category } = args;
        const trashedClothes = await this.clothesRepository.find({
            where: {
                trash: 'Trash',
                category,
                userId: id,
            },
        });

        return trashedClothes;
    }

    async getWishedClothes(args: { id: string, category: Category }): Promise<ClothesEntity[]> {
        const { id, category } = args;
        const wishedClothes = await this.clothesRepository.find({
            where: {
                wish: 'Wish',
                category,
                userId: id,
            },
        });

        return wishedClothes;
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

    async addClothes(args: { category: Category, styles: Styles[], like: 'Like' | 'None', trash: 'Trash' | 'None', wish: 'Wish' | 'None', imageUrl: string, link?: string, userId: string }): Promise<StringResponseDto> {
        const { category, styles, like, trash, wish, imageUrl, link, userId } = args;

        const user = await this.queryBus.execute(
            new GetUserQuery({
                where: {
                    id: userId,
                },
            }),
        );

        if (!user) {
            return { result: 'No corresponding user found' };
        }

        const clothes = await this.clothesRepository.save(
            await this.clothesRepository.create({
                category,
                styles,
                like,
                trash,
                wish,
                imageUrl,
                link,
                user,
            }),
        );

        return { result: 'a new clothes entity has been created: ' + clothes.id };
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

        const currentLike = selectedClothes.like;
        if (currentLike.match('Like')) {
            // If Like tag exists, remove it
            const newLike = 'None';
            await this.clothesRepository.update(clothesId, { like: newLike });
            return { result: 'Like has been removed' };
        } else {
            // If Like tag does not exist, add it
            const newLike = 'Like';
            await this.clothesRepository.update(clothesId, { like: newLike });
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

        const currentTrash = selectedClothes.trash;
        
        if (currentTrash.match('Trash')) {
            const updatedTrash = 'None';
            await this.clothesRepository.update(clothesId, { trash: updatedTrash });
            return { result: 'Trash tag has been removed' };
        } else {
            const updatedTrash = 'Trash';
            await this.clothesRepository.update(clothesId, { trash: updatedTrash });
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

        const currentWish = selectedClothes.wish;
        
        if (currentWish.match('Wish')) {
            const updatedWish = 'None';
            await this.clothesRepository.update(clothesId, { wish: updatedWish });
            return { result: 'Clothes has been removed from wish list' };
        } else {
            const updatedWish = 'Wish';
            await this.clothesRepository.update(clothesId, { wish: updatedWish});
            return { result: 'Clothes is added to wish list' };
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
