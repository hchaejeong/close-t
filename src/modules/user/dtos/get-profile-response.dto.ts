import { IsEmail, IsString } from "class-validator";

export class GetProfileResponseDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    profileImage: string;

    @IsString()
    gender: string;
}