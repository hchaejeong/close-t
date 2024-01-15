import { IsArray, IsEnum, IsString } from "class-validator"
import { Like } from "../entities/codi.entity";

export class GetLikedCodiesResponseDto {
    @IsArray()
    @IsString({ each: true })
    codiIds: string[];

    @IsString({ each: true })
    @IsArray()
    clothesImageUrls: string[][];
}