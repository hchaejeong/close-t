import { Exclude, Expose } from "class-transformer";
import { Styles, UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Category {
    Top = '상의',
    Bottom = '하의',
    Outer = '아우터',
    OnePiece = '원피스',
    Shoes = '신발',
    Bag = '가방',
}

@Entity({
    name: 'clothes',
})
export class ClothesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 25,
    })
    @Expose()
    category: Category;

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
    like: 'Like' | 'None';

    @Column({
        type: 'varchar',
        length: 25,
    })
    @Expose()
    wish: 'Wish' | 'None';

    @Column({
        type: 'varchar',
        length: 25,
    })
    @Expose()
    trash: 'Trash' | 'None';

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    imageUrl: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
    })
    @Expose()
    link?: string | null;

    @ManyToOne(() => UserEntity, (user) => user.clothes)
    @Exclude({ toPlainOnly: true })
    user: UserEntity | null;

    @Column()
    @Expose()
    userId: string;
}