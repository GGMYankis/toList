import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '../login/database/conection';
import * as sql from 'mssql';
import { ChangeStatusDto, TaskDto, TaskNotificacionDto } from './task-master-dto/task';
import { MailService } from '../mail/mail.service';
import { MailDto } from '../mail/mail-dto/mail';
import { NotificacionService } from '../notificacion/notificacion.service';
import { NotificacionDto } from '../notificacion/notificacion-dto/notificacion';

@Injectable()
export class TaskMasterService {

    constructor(
        private readonly notificacionService: NotificacionService,
        private readonly mailService: MailService,
    ) { }

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
                .input('SubAction', sql.VarChar(50), 'myTask')
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
    async listUserTaskOtherTeam(id: string) {

        const pool = await connectToDatabase();
        try {
            const result = await pool.request()
                .input('Id_teams', sql.Int, 0)
                .input('Id_user', sql.Int, id)
                .input('Action', sql.VarChar(10), 'list')
                .input('SubAction', sql.VarChar(50), 'solicitudes')
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



            const idNewTask = result.recordset[0].NewTaskId;
            const foundUser = await pool.request()
                .query(`select * from users2 where id  = ${taskDto.id_user} `);

            const userFound = await this.getUser(taskDto.id_creador);

            if (foundUser.recordset) {

                const configMail: MailDto = {

                    email: foundUser.recordset[0].correo,
                    taskName: taskDto.titulo,
                    descripcion: taskDto.descripcion,
                    userName: foundUser.recordset[0].nombre,
                    fechaVencimiento: taskDto.fechaVencimiento
                }

                this.mailService.sendUserConfirmation(configMail);

                const configNotificacion: NotificacionDto = {
                    descripcion: `${userFound.recordset[0].nombre} te ha asignado una nueva tarea`,
                    idUsuario: taskDto.id_user,
                    idUsuarioNotificador: taskDto.id_creador,
                    idTask: idNewTask,
                }


                this.notificacionService.register(configNotificacion);
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

    async changeStatus(taskNotificacionDto: TaskNotificacionDto) {
        const pool = await connectToDatabase();
        try {


            const result = await pool.request()
                .input('Action', sql.VarChar(10), 'status')
                .input('Id_task', sql.Int, taskNotificacionDto.idTask)
                .input('Id_Estado', sql.Int, taskNotificacionDto.id_status)

                .execute('asp_task');

            const result2 = await pool.request()
                .query(`SELECT * FROM USERS2  where id =  ${taskNotificacionDto.idUsuarioNotificador} `);

            const result3 = await pool.request()
                .query(`SELECT * FROM TASKS  where id =  ${taskNotificacionDto.idTask} `);

            const userName = result2.recordset[0].nombre;
            const taskName = result3.recordset[0].titulo;


            const configNotificacion: NotificacionDto = {
                descripcion: `${userName} ha completado   la tarea ${taskName}`,
                idUsuario: taskNotificacionDto.idUsuario,
                idUsuarioNotificador: taskNotificacionDto.idUsuarioNotificador,
                idTask: taskNotificacionDto.idTask,
            }


            this.notificacionService.register(configNotificacion);

            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }

    async revisada(id: string) {
        const pool = await connectToDatabase();
        try {

            const result = await pool.request()
                .query(`update tasks  set revisada  =  1 where id =  ${id} `);

            return result.recordset;
        } catch (err) {
            return {
                status: false,
                value: null,
                message: err.message
            }
        }
    }


    async getUser(id: Number) {
        const pool = await connectToDatabase();

        try {

            const user = await pool.request()
                .query(`select * from users2 where id  = ${id} `);

            return user;
        } catch (error) {

        }

    }
}
