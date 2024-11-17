import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskMasterService } from './task-master.service';
import { ChangeStatusDto, TaskDto, TaskNotificacionDto } from './task-master-dto/task';

@ApiTags('task-master')
@Controller('task-master')
export class TaskMasterController {

    constructor(private readonly taskMasterService: TaskMasterService) { }


    @Get('listColors')
    ListColor() {
        return this.taskMasterService.listColor();
    }

    @Get(':id')
    List(@Param('id') id: string) {
        return this.taskMasterService.list(id);
    }

    @Get('user/:id')
    ListUserTask(@Param('id') id: string) {
        return this.taskMasterService.userTask(id);
    }

    @Post()
    Register(@Body() taskDto: TaskDto) {
        return this.taskMasterService.register(taskDto);
    }

    @Put()
    Edit(@Body() taskDto: TaskDto) {
        return this.taskMasterService.Edit(taskDto);
    }


    @Post('status')
    ChangeStatus(@Body() taskNotificacionDto: TaskNotificacionDto) {
        return this.taskMasterService.changeStatus(taskNotificacionDto);
    }

    @Get('revisada/:id/:idUser/:idNotificador')
    Revisada(@Param('id') id: string, idUser: string, idNotificador: string) {
        //  return this.taskMasterService.revisada(id, idUser, idNotificador);
    }

    @Post('revisada')
    newRevisada(@Body() taskNotificacionDto: TaskNotificacionDto) {
        return this.taskMasterService.revisada(taskNotificacionDto);
    }


}
