import { IsArray, IsOptional, IsString } from "class-validator"
import { Styles } from "src/modules/user/entities/user.entity"
import { Like } from "../entities/codi.entity";

export class GetSelectedCodiResponseDto {
    @IsString()
    @IsArray()
    styles: Styles[];

    @IsString()
    @IsArray()
    clothesImages: string[];

    @IsString()
    @IsOptional()
    comment?: string;

    @IsString()
    like: Like;

    @IsString()
    @IsArray()
    links: string[];
}