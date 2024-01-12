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
    @IsString({ each: true })
    clothesIds: string[];

    @IsString()
    @IsString({ each: true })
    clothesImages: string[];

    @IsString()
    @IsOptional()
    comment?: string;
}