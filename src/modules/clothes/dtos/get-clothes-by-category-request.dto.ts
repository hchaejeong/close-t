import { IsEnum, IsString } from "class-validator";
import { Category } from "../entities/clothes.entity";

export class GetClothesByCategoryRequestDto {
    @IsEnum(Category)
    @IsString()
    category: Category;
}