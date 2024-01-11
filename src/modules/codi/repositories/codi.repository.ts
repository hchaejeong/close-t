import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CodiEntity } from "../entities/codi.entity";
import { Styles, UserEntity } from "src/modules/user/entities/user.entity";

@Injectable()
export class CodiRepository {
    constructor(@InjectRepository(CodiEntity) private repository: Repository<CodiEntity>,) {}

    create(args: { styles: Styles[], clothesIds: string[], user: UserEntity }): CodiEntity {
        const { styles, clothesIds, user } = args;

        return this.repository.create({
            styles,
            clothesIds,
            user,
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