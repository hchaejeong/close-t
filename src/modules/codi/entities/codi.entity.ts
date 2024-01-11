import { Exclude, Expose } from "class-transformer";
import { Styles, UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    styles: Styles[];

    @Column({
        array: true,
    })
    clothesIds: string[];

    @ManyToOne(() => UserEntity, (user) => user.clothes)
    @Exclude({ toPlainOnly: true })
    user: UserEntity | null;

    @Column()
    @Expose()
    userId: string;
}