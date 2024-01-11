import { IsArray } from "class-validator";
import { ClothesEntity, Tag } from "../entities/clothes.entity";

export class GetClothesResponseDto {
    @IsArray()
    clothes: ClothesEntity[];
}