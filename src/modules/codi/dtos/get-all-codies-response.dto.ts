import { IsArray, IsEnum, IsString } from "class-validator"
import { Like } from "../entities/codi.entity";

export class GetAllCodiesResponseDto {
    @IsArray()
    @IsString({ each: true })
    codiIds: string[];
    
    @IsEnum(Like, { each: true })
    @IsArray()
    likes: Like[];

    @IsString({ each: true })
    @IsArray()
    clothesImageUrls: string[][];
}