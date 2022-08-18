/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/database/database.const';
import { Task } from 'src/database/entities/task.entity';

@Injectable()
export class Repository {
  constructor(
    @Inject(TASK_REPOSITORY)
    private repository: typeof Task,
  ) {}

  create = async (newModel: {
    name: string;
    description: string;
    order: number;
    status: 'New' | 'In progress' | 'In review' | 'Done';
    codigo: string;
  }): Promise<Task> => {
    console.log(newModel)
    return await this.repository.create(newModel);
  };

  getById = async (id: number): Promise<Task> => {
    const response = await this.repository.findOne({ where: { id } });
    return response ? response.get() : null;
  };

  getByCode = async (codigo: string): Promise<Task> => {
    const response = await this.repository.findOne({ where: { codigo } });
    return response ? response.get() : null;
  };

  update = async (
    id: number,
    values: {
      name?: string;
      description?: string;
      order?: number;
      status?: 'New' | 'In progress' | 'In review' | 'Done';
    },
  ) => {
    return await this.repository.update(values, { where: { id } });
  };

  delete = async (id: number) => {
    return await this.repository.destroy({ where: { id } });
  };

  get = async (codigo: string) => {
    return await this.repository.findAll({
      
    });
  };
}
