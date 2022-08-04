import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Auth()
  @Post()
  async create(@Req() req, @Body() task: CreateTaskDto): Promise<boolean> {
    const code = req.user;
    return await this.taskService.create(task, code);
  }
  @Auth()
  @Get(':id')
  async read(@Param('id') id: number) {
    return await this.taskService.getByID(id);
  }
  @Auth()
  @Put(':id')
  async update(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    return await this.taskService.update(id, task);
  }
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.taskService.delete(id);
  }
  @Auth()
  @Get()
  async readAll(@Req() req) {
    const code = req.user;
    return await this.taskService.getAll(code);
  }
}
