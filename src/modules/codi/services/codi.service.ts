import { Injectable } from '@nestjs/common';
import { CodiRepository } from '../repositories/codi.repository';
import { Styles } from 'src/modules/user/entities/user.entity';
import { CodiEntity, Like } from '../entities/codi.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from 'src/modules/user/queries/impl/get-user.query';
import { GetClothesQuery } from 'src/modules/clothes/queries/impl/get-clothes.query';
import { StringResponseDto } from '../dtos/string-response.dto';

@Injectable()
export class CodiService {
    constructor(private codiRepository: CodiRepository, private queryBus: QueryBus) {}

    async getCodies(args: { userId: string }): Promise<CodiEntity[]> {
        const { userId } = args;

        const codies = await this.codiRepository.find({
            where: {
                userId,
            },
        });

        return codies;
    }

    async getSelectedCodi(args: { userId: string, codiId: string }): Promise<{ codi: CodiEntity, links: string[] }> {
        const { userId, codiId } = args;

        const codi = await this.codiRepository.findOne({
            where: {
                id: codiId,
                userId,
            },
        });

        const links = [];

        await Promise.all(codi.clothesIds.map(async (selectedClothesId) => {
            const selectedClothes = await this.queryBus.execute(
                new GetClothesQuery({
                    where: {
                        id: selectedClothesId,
                    },
                }),
            )
            if (selectedClothes.link) {
                links.push(selectedClothes.link);
            } else {
                links.push(null);
            }
        }));

        return { codi, links };
    }

    async getMainStylesFromClothes(args: { userId: string, clothesIds: string[] }): Promise<Styles[]> {
        const { userId, clothesIds } = args;
        const stylesSet = new Set<Styles>();

        await Promise.all(clothesIds.map(async (selectedClothesId) => {
            const selectedClothes = await this.queryBus.execute(
                new GetClothesQuery({
                    where: {
                        id: selectedClothesId,
                        userId,
                    },
                }),
            )
            if (selectedClothes.styles) {
                selectedClothes.styles.forEach(style => {
                    if (stylesSet.size < 3) {
                        stylesSet.add(style);
                    }
                });
            }
        }));

        return Array.from(stylesSet);
    }

    async saveCodi(args: { userId: string, styles: Styles[], like: Like, clothesIds: string[], clothesImages: string[], comment?: string }): Promise<StringResponseDto> {
        const { userId, styles, like, clothesIds, clothesImages, comment } = args;

        const user = await this.queryBus.execute(
            new GetUserQuery({
                where: {
                    id: userId,
                },
            }),
        );

        const codi = await this.codiRepository.save(
            await this.codiRepository.create({
                styles,
                like,
                clothesIds,
                clothesImages,
                comment,
                user,
                userId,
            }),
        );

        return { result: 'codi has been saved' };
    }
    
    async updateCodi(args: { userId: string, codiId: string, clothesId: string }): Promise<StringResponseDto> {
        const { userId, codiId, clothesId } = args;

        const codi = await this.codiRepository.findOne({ 
            where: {
                id: codiId,
                userId,
            },
        });

        const clothes = await this.queryBus.execute(
            new GetClothesQuery({
                where: {
                    id: clothesId,
                    userId,
                },
            }),
        );

        codi.clothesIds.push(clothesId);
        codi.clothesImages.push(clothes.imageUrl);
        const styles = clothes.styles;

        styles.forEach(style => {
            if (!codi.styles.includes(style)) {
                codi.styles.push(style);
            }
        });

        await this.codiRepository.save(codi);

        return { result: 'the selected clothes has been added to my codi' };
    }

    async addComment(args: { userId: string, codiId: string, comment: string }): Promise<StringResponseDto> {
        const { codiId, comment } = args;
        
        await this.codiRepository.update(codiId, {
            comment,
        });

        return { result: 'comment has been added to the codi' };
    }

    async likeOrDislikeCodi(args: { userId: string, codiId: string }): Promise<StringResponseDto> {
        const { userId, codiId } = args;

        const codi = await this.codiRepository.findOne({
            where: {
                id: codiId,
                userId,
            },
        });

        if (!codi) {
            return { result: 'No codi is found' };
        }

        const newLike = codi.like === Like.Like ? Like.None : Like.Like;

        await this.codiRepository.update(codiId, {
            like: newLike,
        });
    
        const updatedCodi = await this.codiRepository.findOne({
            where: {
                id: codiId,
                userId,
            },
        });

        return { result: 'the like has been changed to ' + updatedCodi.like };
    }
}
