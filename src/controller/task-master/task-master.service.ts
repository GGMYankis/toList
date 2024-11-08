import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import * as sql from 'mssql';
import { ChangeStatusDto, TaskDto } from './task-master-dto/task';
import { MailService } from '../mail/mail.service';
import { MailDto } from '../mail/mail-dto/mail';

@Injectable()
export class TaskMasterService {

    constructor(private readonly mailService: MailService) { }

    async list(id: string) {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('Id_teams', sql.Int, id)
                .input('Action', sql.VarChar(10), 'list')
                .execute('asp_task');
            const tareasAgrupadas = {
                tareasPendientes: result.recordset.filter(task => task.id_estado === 1),
                tareasCompletadas: result.recordset.filter(task => task.id_estado === 3),
                tareasEnProgreso: result.recordset.filter(task => task.id_estado === 2),
            }
            return {
                status: true,
                value: tareasAgrupadas,
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

    async userTask(id: string) {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('Id_teams', sql.Int, 0)
                .input('Id_user', sql.Int, id)
                .input('Action', sql.VarChar(10), 'list')
                .execute('asp_task');

            let tareasAgrupadas = {}
            if (result.recordset.length > 0) {
                tareasAgrupadas = {
                    tareasPendientes: result.recordset.filter(task => task.id_estado === 1),
                    tareasCompletadas: result.recordset.filter(task => task.id_estado === 3),
                    tareasEnProgreso: result.recordset.filter(task => task.id_estado === 2),
                }
            }

            return {
                status: true,
                value: tareasAgrupadas,
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

    async listColor() {
        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .execute('asp_colors');

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

    async register(taskDto: TaskDto) {
        const pool = await connectToDatabase();
        try {

            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'register')
                .input('Id_creador', sql.Int, taskDto.id_creador)
                .input('Id_user', sql.Int, taskDto.id_user)
                .input('Id_teams', sql.Int, taskDto.id_teams)
                .input('Titulo', sql.VarChar(100), taskDto.titulo)
                .input('Descripcion', sql.VarChar(sql.MAX), taskDto.descripcion)
                .input('Color', sql.VarChar(100), taskDto.color)
                .input('Id_Estado', sql.Int, taskDto.id_Estado)
                .input('Id_Priority', sql.Int, taskDto.id_priority)
                .input('FechaVencimiento', sql.DateTime, taskDto.fechaVencimiento)
                .input('Imagen', sql.VarChar(sql.MAX), taskDto.imagen)
                .input('Revisada', 0)
                .execute('asp_task');

            const foundUser = await pool.request()
                .query(`select * from users where id  = ${taskDto.id_user} `);

            if (foundUser.recordset) {

                const configMail: MailDto = {
                    email: foundUser.recordset[0].correo,
                    taskName: taskDto.titulo,
                    descripcion: taskDto.descripcion,
                    userName: foundUser.recordset[0].nombre,
                    fechaVencimiento: taskDto.fechaVencimiento
                }

                this.mailService.sendUserConfirmation(configMail);
            }

            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }

    async Edit(taskDto: TaskDto) {
        const pool = await connectToDatabase();
        try {

            console.log(taskDto)
            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'update')
                .input('Id_task', sql.Int, taskDto.id_task)
                .input('Id_user', sql.Int, taskDto.id_user)
                .input('Id_teams', sql.Int, taskDto.id_teams)
                .input('Titulo', sql.VarChar(100), taskDto.titulo)
                .input('Descripcion', sql.VarChar(sql.MAX), taskDto.descripcion)
                .input('Id_Estado', sql.Int, taskDto.id_Estado)
                .input('Id_Priority', sql.Int, taskDto.id_priority)
                .input('FechaVencimiento', sql.DateTime, taskDto.fechaVencimiento)

                .execute('asp_task');

            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }

    async changeStatus(changeStatusDto: ChangeStatusDto) {
        const pool = await connectToDatabase();
        try {

            console.log(changeStatusDto)

            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'status')
                .input('Id_task', sql.Int, changeStatusDto.id_task)
                .input('Id_Estado', sql.Int, changeStatusDto.id_status)

                .execute('asp_task');


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
