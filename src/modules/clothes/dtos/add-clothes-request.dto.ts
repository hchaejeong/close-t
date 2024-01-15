import { IsEnum, IsOptional, IsString } from "class-validator";
import { Category } from "../entities/clothes.entity";
import { Styles } from "src/modules/user/entities/user.entity";

export class AddClothesRequestDto {
    @IsString()
    category: Category;

    @IsEnum(Styles, { each: true })
    //@IsArray()
    styles: Styles[];

    @IsString()
    like: 'Like' | 'None';

    @IsString()
    wish: 'Wish' | 'None';

    @IsString()
    trash: 'Trash' | 'None';

    @IsString()
    imageUrl: string;

    @IsOptional()
    @IsString()
    link?: string | null;

    //@IsString()
    userId: string;
}