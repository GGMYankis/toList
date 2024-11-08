import { Test, TestingModule } from '@nestjs/testing';
import { TaskMasterService } from './task-master.service';

describe('TaskMasterService', () => {
  let service: TaskMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskMasterService],
    }).compile();

    service = module.get<TaskMasterService>(TaskMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
