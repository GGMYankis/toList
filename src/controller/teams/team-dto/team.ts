import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export class TeamDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fondo: string;


    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idLeader: number;



}