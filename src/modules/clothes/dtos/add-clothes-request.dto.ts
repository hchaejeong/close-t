import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { Category, Tag } from "../entities/clothes.entity";
import { Styles } from "src/modules/user/entities/user.entity";

export class AddClothesRequestDto {
    @IsEnum(Category)
    category: Category;

    @IsEnum(Styles, { each: true })
    @IsArray()
    styles: Styles[];

    @IsOptional()
    @IsArray()
    @IsEnum(Tag, { each: true })
    tag?: Tag[] | null;

    @IsString()
    imageUrl: string;

    @IsOptional()
    @IsString()
    link?: string | null;

    @IsString()
    userId: string;
}