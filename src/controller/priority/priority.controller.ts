import { Controller, Get } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('priority')
@Controller('priority')
export class PriorityController {
    constructor(private readonly priorityService: PriorityService) { }


    @Get()
    ListColor() {
        return this.priorityService.list();
    }
}
