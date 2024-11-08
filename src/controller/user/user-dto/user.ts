import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export class UserDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idUser: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    correo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    idRol: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    avatar: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    clave: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idTeam: number;



}