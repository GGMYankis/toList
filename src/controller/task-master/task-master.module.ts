import { Module } from '@nestjs/common';
import { TaskMasterController } from './task-master.controller';
import { TaskMasterService } from './task-master.service';
import { MailService } from '../mail/mail.service';
import { NotificacionService } from '../notificacion/notificacion.service';

@Module({
  controllers: [TaskMasterController],
  providers: [TaskMasterService, MailService, NotificacionService]
})
export class TaskMasterModule { }
