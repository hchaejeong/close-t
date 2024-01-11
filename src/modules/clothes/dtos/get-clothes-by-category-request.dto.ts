import { IsString } from "class-validator";
import { Category } from "../entities/clothes.entity";

export class GetClothesByCategoryRequestDto {
    @IsString()
    category: Category;
}