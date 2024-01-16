import { IsEnum, IsNumber } from "class-validator";
import { BodyType } from "../entities/user.entity";

export class UpdateUserRequestDto {
    @IsNumber()
    age: number;

    @IsNumber()
    height: number;

    @IsEnum(BodyType)
    bodyType: BodyType;
}