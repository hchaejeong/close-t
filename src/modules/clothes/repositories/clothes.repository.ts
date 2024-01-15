import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Styles, UserEntity } from "src/modules/user/entities/user.entity";
import { Category, ClothesEntity } from "../entities/clothes.entity";

@Injectable()
export class ClothesRepository {
    constructor(@InjectRepository(ClothesEntity) private repository: Repository<ClothesEntity>,) {}

    create(args: { category: Category, styles: Styles[], like: 'Like' | 'None', trash: 'Trash' | 'None', wish: 'Wish' | 'None', imageUrl: string, link?: string, user: UserEntity}): ClothesEntity {
        const { category, styles, like, trash, wish, imageUrl, link, user } = args;

        return this.repository.create({
            category,
            styles,
            like,
            trash,
            wish,
            imageUrl,
            link,
            user
        });
    }

    save(...args: Parameters<Repository<ClothesEntity>['save']>): ReturnType<Repository<ClothesEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<ClothesEntity>['find']>): ReturnType<Repository<ClothesEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<ClothesEntity>['findOne']>): ReturnType<Repository<ClothesEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<ClothesEntity>['update']>): ReturnType<Repository<ClothesEntity>['update']> {
        return this.repository.update(...args);
    }

    remove(...args: Parameters<Repository<ClothesEntity>['remove']>): ReturnType<Repository<ClothesEntity>['remove']> {
        return this.repository.remove(...args);
    }
}