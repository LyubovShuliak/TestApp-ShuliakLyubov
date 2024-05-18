import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';

import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { TaskHistoryEntity } from '../common/config/typeorm/entities/TaskHistory.entity';
import { TaskOrderEntity } from '../common/config/typeorm/entities/TaskOrder.entity';
import {
  UpdateEvent,
  UpdateEventEnum,
} from '../common/config/typeorm/entities/UpdateEvent.entity';

import { CreateTaskDto } from './dto/create-task.dto'; // Assuming the DTO file paths
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskHistoryEntity)
    private readonly taskHistoryRepository: Repository<TaskHistoryEntity>,
    @InjectRepository(TaskOrderEntity)
    private readonly taskOrderRepository: Repository<TaskOrderEntity>,
    @InjectRepository(UpdateEvent)
    private readonly updateEventsRepository: Repository<UpdateEvent>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({
      description: createTaskDto.description,
      board: createTaskDto.boardId,
      boardColumnType: createTaskDto.status,
      title: createTaskDto.title,
    });
    const taskDB = await this.taskRepository.save(newTask);

    const createEvent = await this.updateEventsRepository.findOne({
      where: { name: UpdateEventEnum.TaskCreated },
    });
    const newHistoryItem = this.taskHistoryRepository.create({
      dateCreated: moment().format('YYYY-MM-DD hh:mm:ss'),
      userId: createTaskDto.userId,
      taskId: newTask.id,
      eventId: createEvent.id,
    });
    await this.taskHistoryRepository.save(newHistoryItem);
    const newTaskOrderItem = this.taskOrderRepository.create({
      order: createTaskDto.order,
      taskId: taskDB.id,
      boardId: createTaskDto.boardId,
    });
    await this.taskOrderRepository.save(newTaskOrderItem);

    return {
      ...newTask,
      order: createTaskDto.order,
      user: createTaskDto.userId,
      status: createTaskDto.status,
      history: await this.taskHistoryRepository.find({
        where: { taskId: taskDB.id },
      }),
    };
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
