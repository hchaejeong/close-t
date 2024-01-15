import { IsNumber } from "class-validator";
import { BodyType } from "../entities/user.entity";

export class UpdateUserRequestDto {
    age: number;

    height: number;

    bodyType: BodyType;
}