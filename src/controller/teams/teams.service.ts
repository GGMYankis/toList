import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import * as sql from 'mssql';
import { TeamDto } from './team-dto/team';

@Injectable()
export class TeamsService {

    async list() {

        const pool = await connectToDatabase();
        try {
            const query = `
    SELECT 
    tm.id,
    tm.nombre,
    tm.fondo, 
    COUNT(t.id) AS TaskCount,
    u.nombre AS lider
FROM 
    teams tm
LEFT JOIN 
    tasks t 
ON 
    tm.id = t.id_teams
LEFT JOIN 
    users2 u 
ON 
    u.id = tm.id_leader

GROUP BY 
    tm.id, tm.nombre, tm.fondo, u.nombre;

          `;

            const result = await pool.request()
                .query(query);


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
        const query = `
      SELECT 
    tm.id,
    tm.nombre,
    tm.fondo, 
    COUNT(t.id) AS TaskCount,
    u.nombre AS lider
FROM 
    teams tm
LEFT JOIN 
    tasks t 
ON 
    tm.id = t.id_teams
LEFT JOIN 
    users2 u 
ON 
    u.id = tm.id_leader
WHERE 
    tm.id = ${id}
GROUP BY 
    tm.id, tm.nombre, tm.fondo, u.nombre;

      `;
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .query(query);

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
