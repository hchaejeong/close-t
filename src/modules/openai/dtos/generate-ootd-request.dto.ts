import { IsEnum, IsString } from "class-validator";
import { Styles } from "src/modules/user/entities/user.entity";

export class GenerateOOTDRequestDto {
    @IsEnum(Styles)
    @IsString()
    stylePick: Styles;
}