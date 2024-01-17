import { IsArray, IsEnum, IsOptional, IsString } from "class-validator"
import { Styles } from "src/modules/user/entities/user.entity"
import { Like } from "../entities/codi.entity";

export class SaveCodiRequestDto {
    @IsEnum(Styles, { each: true })
    @IsArray()
    styles: Styles[];

    @IsEnum(Like)
    @IsString()
    like: Like;

    @IsArray()
    clothesIds: (string | null)[];

    @IsArray()
    clothesImages: (string | null)[];

    @IsString()
    @IsOptional()
    comment?: string;
}