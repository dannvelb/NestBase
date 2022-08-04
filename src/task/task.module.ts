import { Module } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/database/database.const';
import { Task } from 'src/database/entities/task.entity';
import { TaskController } from './task.controller';
import { Repository as TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskRepository,
    { provide: TASK_REPOSITORY, useValue: Task },
  ],
  exports: [TaskService],
})
export class TaskModule {}
