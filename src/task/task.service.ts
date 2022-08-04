import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/database/entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Repository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: Repository) {}

  create = async (task: CreateTaskDto, code: string) => {
    await this.taskRepository.create({
      ...task,
      status: 'New',
      order: 0,
      codigo:code,
    });
    return true;
  };

  getByID = async (id: number): Promise<Task> => {
    const response = await this.taskRepository.getById(id);
    if (!response) {
      throw new NotFoundException('Task not found');
    }
    return response;
  };

  getByCode = async (id: string): Promise<Task> => {
    const response = await this.taskRepository.getByCode(id);
    return response;
  };

  update = async (id: number, task: UpdateTaskDto): Promise<boolean> => {
    await this.getByID(id);
    await this.taskRepository.update(id, task);
    return true;
  };

  delete = async (id: number): Promise<boolean> => {
    await this.getByID(id);
    await this.taskRepository.delete(id);
    return true;
  };

  getAll = async (code: string): Promise<Array<Task>> =>
    await this.taskRepository.get(code);
}
