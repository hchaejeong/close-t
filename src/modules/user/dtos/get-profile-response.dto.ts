import { IsString } from "class-validator";

export class GetProfileResponseDto {
    @IsString()
    name: string;

    @IsString()
    gender: string;
}