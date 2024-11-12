import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import * as sql from 'mssql';
import { TeamDto } from './team-dto/team';

@Injectable()
export class TeamsService {

    async list() {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .query('select * from teams');

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
    async listTeamsOfUser(id: string) {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .query(`select * from teams where id = ${id} `);

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

    async register(taskDto: TeamDto) {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'register')
                .input('Nombre', sql.VarChar(100), taskDto.nombre)
                .input('Fondo', sql.VarChar(255), taskDto.fondo)
                .input('Id_leader', sql.Int, taskDto.idLeader)

                .execute('asp_team');
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
