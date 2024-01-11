import { Exclude, Expose } from "class-transformer";
import { ClothesEntity } from "src/modules/clothes/entities/clothes.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum BodyType {
    Straight = '스트레이트',
    Wave = '웨이브',
    Natural = '내추럴',
    HourGlass = '모래시계형',
}

export enum Styles {
    Casual = '캐주얼',
    Sporty = '스포티',
    Lovely = '러블리',
    Basic = '심플베이직',
    Chic = '모던시크',
    Romantic = '로맨틱럭셔리',
    Formal = '포멀/오피스룩',
}

@Entity({
    name: 'user',
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    name: string;

    @Column({
        type: 'varchar',
        length: 25,
    })
    @Expose()
    gender: string;

    @Column({
        type: 'int',
    })
    @Expose()
    age: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    @Expose()
    height?: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    bodyType: BodyType;

    @Column({
        type: 'varchar',
        length: 100,
        array: true,
    })
    @Expose()
    styles: Styles[];

    @OneToMany(() => ClothesEntity, (clothes) => clothes.user)
    @Exclude({ toPlainOnly: true })
    clothes: ClothesEntity[] | null;
}