import { IsString } from "class-validator";
import { Tag } from "../entities/clothes.entity";

export class FilterClothesByTagRequestDto {
    @IsString()
    tag: Tag;
}