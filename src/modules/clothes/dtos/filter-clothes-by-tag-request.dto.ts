import { IsEnum, IsString } from "class-validator";
import { Tag } from "../entities/clothes.entity";

export class FilterClothesByTagRequestDto {
    @IsEnum(Tag)
    @IsString()
    tag: Tag;
}