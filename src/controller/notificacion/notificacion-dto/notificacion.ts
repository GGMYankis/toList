import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsBase64, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class NotificacionDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idUsuario: Number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idUsuarioNotificador: Number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    idTask: Number;




}