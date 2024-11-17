import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificacionService } from './notificacion.service';
import { NotificacionDto } from './notificacion-dto/notificacion';

@ApiTags('notificacion')
@Controller('notificacion')
export class NotificacionController {


    constructor(private readonly notificacionService: NotificacionService) { }

    @Get(':id')
    List(@Param('id') id: string) {
        return this.notificacionService.list(id);
    }

    @Post()
    Register(@Body() notificacionDto: NotificacionDto) {
        return this.notificacionService.register(notificacionDto);
    }

    @Get('changeStatus/:id')
    changeStatus(@Param('id') id: string) {
        return this.notificacionService.changeStatus(id);
    }

}
