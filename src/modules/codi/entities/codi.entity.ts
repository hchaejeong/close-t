import { Exclude, Expose } from "class-transformer";
import { Styles, UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Like {
    Like = 'like',
    None = 'none',
}

@Entity({
    name: 'codi',
})
export class CodiEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        array: true,
    })
    @Expose()
    styles: Styles[];

    @Column({
        type: 'varchar',
        length: 25,
    })
    @Expose()
    like: Like;

    @Column({
        type: 'uuid',
        array: true,
    })
    @Expose()
    clothesIds: string[];

    @Column({
        type: 'varchar',
        length: 100,
        array: true,
    })
    @Expose()
    clothesImages: string[];

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    @Expose()
    comment?: string;

    @ManyToOne(() => UserEntity, (user) => user.clothes)
    @Exclude({ toPlainOnly: true })
    user: UserEntity | null;

    @Column()
    @Expose()
    userId: string;
}