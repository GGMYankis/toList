import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import * as sql from 'mssql';
import { UserDto } from './user-dto/user';

@Injectable()
export class UserService {

    async listByTeam(idTeam: string) {
        const pool = await connectToDatabase();

        console.log(idTeam)
        try {


            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'listByTeam')
                .input('id_team', sql.Int, idTeam)
                .execute('asp_register_user');

            return {
                status: true,
                value: result.recordset,
                msgError: null
            }

        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }

    async listAdmin() {
        const pool = await connectToDatabase();

        try {


            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'listAdmin')
                .execute('asp_register_user');

            return {
                status: true,
                value: result.recordset,
                msgError: null
            }

        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }


    async register(userDto: UserDto) {
        const pool = await connectToDatabase();
        try {


            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'register')
                .input('nombre', sql.VarChar(100), userDto.nombre)
                .input('correo', sql.VarChar(sql.MAX), userDto.correo)
                .input('id_rol', sql.Int, userDto.idRol)
                .input('avatar', sql.VarChar(sql.MAX), userDto.avatar)
                .input('contraseña', sql.VarChar(100), userDto.clave)
                .input('id_team', sql.Int, userDto.idTeam)
                .execute('asp_register_user');

            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }
    async Edit(userDto: UserDto) {
        const pool = await connectToDatabase();
        try {

            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'update')
                .input('id', sql.Int, userDto.idUser)
                .input('nombre', sql.VarChar(100), userDto.nombre)
                .input('correo', sql.VarChar(sql.MAX), userDto.correo)
                .input('id_rol', sql.Int, userDto.idRol)
                .input('avatar', sql.VarChar(sql.MAX), userDto.avatar)
                .input('contraseña', sql.VarChar(100), userDto.clave)
                .input('id_team', sql.Int, userDto.idTeam)
                .execute('asp_register_user');

            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }
}
