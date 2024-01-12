import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { BodyType, Styles } from "../entities/user.entity";

export class CreateUserRequestDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    gender: string;

    @IsNumber()
    @IsOptional()
    age?: number | null;

    @IsNumber()
    @IsOptional()
    height?: number | null;

    @IsString()
    @IsOptional()
    bodyType?: BodyType | null;

    @IsString()
    @IsArray()
    @IsOptional()
    styles?: Styles[] | null;
}