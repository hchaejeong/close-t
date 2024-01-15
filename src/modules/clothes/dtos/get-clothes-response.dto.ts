import { IsArray } from "class-validator";
import { ClothesEntity } from "../entities/clothes.entity";

export class GetClothesResponseDto {
    @IsArray()
    clothes: ClothesEntity[];
}