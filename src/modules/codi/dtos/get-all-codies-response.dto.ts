import { IsArray, IsString } from "class-validator"
import { Like } from "../entities/codi.entity";

export class GetAllCodiesResponseDto {
    @IsString()
    @IsArray()
    codiIds: string[];
    
    @IsString()
    @IsArray()
    likes: Like[];

    @IsString()
    @IsArray()
    clothesImageUrls: string[][];
}