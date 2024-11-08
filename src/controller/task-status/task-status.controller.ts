import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskStatusService } from './task-status.service';

@ApiTags('task-status')
@Controller('task-status')
export class TaskStatusController {

    constructor(private readonly taskStatusService: TaskStatusService) { }

    @Get()
    List() {
        return this.taskStatusService.list();
    }
}
