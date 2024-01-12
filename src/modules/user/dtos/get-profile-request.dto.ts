import { IsString } from "class-validator";

export class GetProfileRequestDto {
    @IsString()
    name: string;

    @IsString()
    gender: string;
}