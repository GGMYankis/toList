import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import * as sql from 'mssql';
import { NotificacionDto } from './notificacion-dto/notificacion';

@Injectable()
export class NotificacionService {


    async list(id: string) {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('accion', sql.VarChar(10), 'listar')
                .input('idUsuario', sql.Int, id)
                .execute('sp_notificaciones');


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

    async register(notificacionDto: NotificacionDto) {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('accion', sql.VarChar(10), 'registrar')
                .input('descripcion', sql.VarChar(100), notificacionDto.descripcion)
                .input('idUsuario', sql.Int, notificacionDto.idUsuario)
                .input('idUsuarioNotificador', sql.Int, notificacionDto.idUsuarioNotificador)
                .input('idTask', sql.Int, notificacionDto.idTask)
                .input('visible', sql.Int, 0)
                .execute('sp_notificaciones');
            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }

    async changeStatus(id: string) {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('accion', sql.VarChar(10), 'visible')
                .input('idNotificacion', sql.Int, id)
                .execute('sp_notificaciones');
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
