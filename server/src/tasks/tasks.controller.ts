import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskOrderDto } from './dto/update-task-order.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get(':boardId')
  async findAll(@Param('boardId', ParseIntPipe) id: number) {
    return await this.tasksService.findAll(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }
  @Patch('order/:taskId/:boardId')
  async updateOrder(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateTaskOrderDto: UpdateTaskOrderDto,
  ) {
    await this.tasksService.updateOrder({
      taskId: taskId,
      ...updateTaskOrderDto,
    });
    return await this.tasksService.getHistory(taskId);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
