import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CodiEntity, Like } from "../entities/codi.entity";
import { Styles, UserEntity } from "src/modules/user/entities/user.entity";
import { QueryBus } from "@nestjs/cqrs";
import { GetUserQuery } from "src/modules/user/queries/impl/get-user.query";
import { string } from "yargs";

@Injectable()
export class CodiRepository {
    constructor(@InjectRepository(CodiEntity) private repository: Repository<CodiEntity>) {}

    create(args: { styles: Styles[], like: Like, clothesIds: string[], clothesImages: string[], comment?: string, user: UserEntity, userId: string }): CodiEntity {
        const { styles, clothesIds, clothesImages, like, comment, user, userId } = args;

        return this.repository.create({
            styles,
            like,
            clothesIds,
            clothesImages,
            comment,
            user,
            userId,
        });
    }

    save(...args: Parameters<Repository<CodiEntity>['save']>): ReturnType<Repository<CodiEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<CodiEntity>['find']>): ReturnType<Repository<CodiEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<CodiEntity>['findOne']>): ReturnType<Repository<CodiEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<CodiEntity>['update']>): ReturnType<Repository<CodiEntity>['update']> {
        return this.repository.update(...args);
    }
}