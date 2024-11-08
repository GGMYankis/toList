import { Test, TestingModule } from '@nestjs/testing';
import { TaskMasterController } from './task-master.controller';

describe('TaskMasterController', () => {
  let controller: TaskMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskMasterController],
    }).compile();

    controller = module.get<TaskMasterController>(TaskMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
