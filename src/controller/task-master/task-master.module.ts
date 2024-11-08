import { Module } from '@nestjs/common';
import { TaskMasterController } from './task-master.controller';
import { TaskMasterService } from './task-master.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [TaskMasterController],
  providers: [TaskMasterService, MailService]
})
export class TaskMasterModule { }
