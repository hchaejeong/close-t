import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BodyType, Styles } from "../entities/user.entity";

export class CreateUserRequestDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    gender: string;

    @IsEmail()
    email: string;

    @IsString()
    profileImage: string;

    @IsNumber()
    @IsOptional()
    age?: number | null;

    @IsNumber()
    @IsOptional()
    height?: number | null;

    @IsEnum(BodyType)
    @IsOptional()
    bodyType?: BodyType | null;

    @IsArray()
    @IsEnum(Styles, { each: true })
    @IsOptional()
    styles?: Styles[] | null;
}