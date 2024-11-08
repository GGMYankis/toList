import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CommentDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idUser: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idTask: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    comentario: string;
}