import { IsArray, IsOptional, IsString } from "class-validator"
import { Styles } from "src/modules/user/entities/user.entity"
import { Like } from "../entities/codi.entity";

export class SaveCodiRequestDto {
    @IsString()
    @IsArray()
    styles: Styles[];

    @IsString()
    like: Like;

    @IsString()
    @IsArray()
    clothesIds: string[];

    @IsString()
    @IsArray()
    clothesImages: string[];

    @IsString()
    @IsOptional()
    comment?: string;
}