import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export class TaskDto {

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_task: Number;


    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_user: Number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_creador: Number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_teams: Number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;



    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_Estado: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_priority: number;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fechaVencimiento: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    color: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    imagen: string;
}


export class ChangeStatusDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_status: Number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_task: Number;


}