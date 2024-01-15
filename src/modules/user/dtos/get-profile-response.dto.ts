import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { BodyType, Styles } from "../entities/user.entity";

export class GetProfileResponseDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    profileImage: string;

    @IsString()
    gender: string;

    @IsOptional()
    @IsNumber()
    age?: number | null;

    @IsOptional()
    @IsNumber()
    height?: number | null;

    @IsOptional()
    @IsString()
    bodyType?: BodyType | null;

    @IsOptional()
    @IsString()
    styles?: Styles[] | null;
}