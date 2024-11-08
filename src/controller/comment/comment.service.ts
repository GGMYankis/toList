import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import { CommentDto } from './commet-dto/comment';
import * as sql from 'mssql';

@Injectable()
export class CommentService {

    async list(idTask: string) {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('Id_task', sql.Int, idTask)
                .input('Action', sql.VarChar(10), 'listComent')
                .execute('asp_task');
            return {
                status: true,
                value: result.recordset,
                msgError: ''
            }
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }
    async register(commentDto: CommentDto) {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('Id_user', sql.Int, commentDto.idUser)
                .input('Id_task', sql.Int, commentDto.idTask)
                .input('Comentario', sql.VarChar(300), commentDto.comentario)
                .input('Action', sql.VarChar(10), 'comentar')
                .execute('asp_task');
            return {
                status: true,
                value: result.recordset,
                msgError: ''
            }
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }
}
