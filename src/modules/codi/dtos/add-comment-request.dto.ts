import { IsString } from "class-validator";

export class AddCommentRequestDto {
    @IsString()
    comment: string;
}