import { Module } from '@nestjs/common';
import { TaskStatusController } from './task-status.controller';
import { TaskStatusService } from './task-status.service';

@Module({
  controllers: [TaskStatusController],
  providers: [TaskStatusService]
})
export class TaskStatusModule {}
