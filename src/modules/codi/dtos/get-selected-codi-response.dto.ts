import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator"
import { Styles } from "src/modules/user/entities/user.entity"
import { Like } from "../entities/codi.entity";

export class GetSelectedCodiResponseDto {
    @IsEnum(Styles, { each: true })
    @IsArray()
    styles: Styles[];

    @IsArray()
    clothesIds: (string | null)[]

    @IsArray()
    @IsString({ each: true })
    clothesImages: string[];

    @IsString()
    @IsOptional()
    comment?: string;

    @IsEnum(Like)
    @IsString()
    like: Like;

    @IsArray()
    @IsString({ each: true })
    links: string[];
}