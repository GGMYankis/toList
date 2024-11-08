import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class MailDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    taskName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fechaVencimiento: Date;
}