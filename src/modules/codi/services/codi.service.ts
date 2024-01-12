import { Injectable } from '@nestjs/common';
import { CodiRepository } from '../repositories/codi.repository';
import { Styles } from 'src/modules/user/entities/user.entity';
import { CodiEntity, Like } from '../entities/codi.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from 'src/modules/user/queries/impl/get-user.query';
import { GetClothesQuery } from 'src/modules/clothes/queries/impl/get-clothes.query';

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

    async saveCodi(args: { userId: string, styles: Styles[], like: Like, clothesIds: string[], clothesImages: string[], comment?: string }): Promise<string> {
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

        return 'codi has been saved';
    }
    
    async updateCodi(args: { userId: string, codiId: string, clothesId: string }): Promise<string> {
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

        codi.clothesImages.push(clothes.imageUrl);
        const styles = clothes.styles;

        styles.forEach(style => {
            if (!codi.styles.includes(style)) {
                codi.styles.push(style);
            }
        });

        await this.codiRepository.save(codi);

        return 'the selected clothes has been added to my codi';
    }

    async addComment(args: { userId: string, codiId: string, comment: string }): Promise<string> {
        const { codiId, comment } = args;
        
        await this.codiRepository.update(codiId, {
            comment,
        });

        return 'comment has been added to the codi';
    }
}
