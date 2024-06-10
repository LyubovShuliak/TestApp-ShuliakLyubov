import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';

import { BoardColumnType } from '../common/config/typeorm/entities/BoardColumnTypes.entity';
import { Event } from '../common/config/typeorm/entities/Event.entity';
import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { TaskHistoryEntity } from '../common/config/typeorm/entities/TaskHistory.entity';
import { TaskOrderEntity } from '../common/config/typeorm/entities/TaskOrder.entity';
import { DATE_FORMAT } from '../common/constants/date-format';
import { EventName } from '../common/enums/event.enum';

import { CreatedTask, CreateTaskDto } from './dto/create-task.dto'; // Assuming the DTO file paths
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  GetTasksResponse,
  HistoryItem,
  TaskCardData,
  TaskColumnName,
} from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskHistoryEntity)
    private readonly taskHistoryRepository: Repository<TaskHistoryEntity>,
    @InjectRepository(TaskOrderEntity)
    private readonly taskOrderRepository: Repository<TaskOrderEntity>,
    @InjectRepository(Event)
    private readonly updateEventsRepository: Repository<Event>,
    @InjectRepository(BoardColumnType)
    private readonly boardColumnTypeRepository: Repository<BoardColumnType>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<CreatedTask> {
    const column = await this.boardColumnTypeRepository.findOne({
      where: { id: createTaskDto.status },
    });

    const newTask = this.taskRepository.create({
      description: createTaskDto.description,
      boardId: createTaskDto.boardId,
      commentsCount: 0,
      title: createTaskDto.title,
    });
    const taskDB = await this.taskRepository.save(newTask);

    const createEvent = await this.updateEventsRepository.findOne({
      where: { name: EventName.TaskCreated },
    });

    const newHistoryItem = this.taskHistoryRepository.create({
      dateCreated: moment().format(DATE_FORMAT),
      userId: createTaskDto.userId,
      taskId: newTask.id,
      eventId: createEvent.id,
      columnId: column.id,
    });
    await this.taskHistoryRepository.save(newHistoryItem);
    const newTaskOrderItem = this.taskOrderRepository.create({
      order: createTaskDto.order,
      task: taskDB,
      boardId: createTaskDto.boardId,
      boardColumnType: createTaskDto.status,
    });
    await this.taskOrderRepository.save(newTaskOrderItem);
    const savedHistoryItems = await this.getHistory(taskDB.id);
    return {
      columnName: column.name as TaskColumnName,
      task: {
        description: newTask.description,
        id: newTask.id,
        commentsCount: newTask.commentsCount,
        title: newTask.title,
        history: savedHistoryItems,
      },
    };
  }

  async findAll(boardId: number): Promise<GetTasksResponse> {
    const dbTasks = await this.taskOrderRepository.find({
      where: { board: { id: boardId } },
      relations: {
        task: { history: { user: true, event: true, column: true } },
        board: true,
      },
      relationLoadStrategy: 'query',

      order: { order: 'ASC', task: { history: { dateCreated: 'desc' } } },
    });

    const columnsDB = await this.boardColumnTypeRepository.find({
      order: { stage: 'ASC' },
    });
    const getTasksResponse = { columns: {}, tasks: {} } as GetTasksResponse;

    for (const column of columnsDB) {
      const columnTasks = dbTasks
        .filter((el) => el.boardColumnType === column.id)
        .map<TaskCardData>((elem) => {
          return {
            id: elem.taskId,
            title: elem.task.title,
            commentsCount: !elem.task.commentsCount
              ? 0
              : elem.task.commentsCount,
            description: elem.task.description,
            history: elem.task.history.map((el) => {
              return this.dbRecordToHistoryItem(el);
            }),
          };
        });
      getTasksResponse.tasks[column.name] = columnTasks;
      getTasksResponse.columns[column.name] = { taskIds: [] };
      getTasksResponse.columns[column.name].taskIds = columnTasks.map(
        (el) => el.id,
      );
      getTasksResponse.columns[column.name].columnId = column.id;
    }

    return getTasksResponse;
  }

  async findOne(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.taskRepository.update(id, updateTaskDto);
    return await this.taskRepository.findOne({ where: { id: id } });
  }
  async updateOrder({
    taskId,
    order,
    columnId,
    previousColumnId,
    previousOrder,
    userId,
  }: {
    taskId: number;
    order: number;
    columnId: number;
    previousColumnId: number;
    previousOrder: number;
    userId: number;
  }): Promise<void> {
    const isTaskStatusNotChanged = previousColumnId === columnId;
    if (!isTaskStatusNotChanged) {
      await this.taskRepository
        .createQueryBuilder()
        .update(TaskOrderEntity)
        .set({ order: () => '"order" - 1' })
        .where('("order" > :order)', {
          order: previousOrder,
        })
        .andWhere('board_column_type_id = :columnId', {
          columnId: previousColumnId,
        })
        .execute();

      await this.taskRepository
        .createQueryBuilder()
        .update(TaskOrderEntity)
        .set({ order: () => '"order" + 1' })
        .where('("order" > :order or "order" = :order)', {
          order: order,
        })
        .andWhere('board_column_type_id = :columnId', {
          columnId: columnId,
        })
        .execute();
      await this.taskOrderRepository.update(
        { taskId },
        { order: order, boardColumnType: columnId },
      );
      const getStatusUpdateEvent = await this.updateEventsRepository.findOne({
        where: { name: EventName.StatusChange },
      });
      const newHistoryItem = this.taskHistoryRepository.create({
        dateCreated: moment().format(DATE_FORMAT),
        userId: userId,
        taskId: taskId,
        eventId: getStatusUpdateEvent.id,
        columnId,
      });
      await this.taskHistoryRepository.save(newHistoryItem);
    }
    if (isTaskStatusNotChanged) {
      const taskOrderRangeToUpdate = [
        Math.min(order, previousOrder),
        Math.max(order, previousOrder),
      ];

      const moveTaskUp = order < previousOrder;
      if (moveTaskUp) {
        await this.taskRepository
          .createQueryBuilder()
          .update(TaskOrderEntity)
          .set({ order: () => '"order" + 1' })
          .where('("order" between :el1 and :el2 )', {
            el1: taskOrderRangeToUpdate[0],
            el2: taskOrderRangeToUpdate[1],
          })
          .andWhere('board_column_type_id = :columnId', {
            columnId: columnId,
          })
          .execute();
      } else {
        await this.taskRepository
          .createQueryBuilder()
          .update(TaskOrderEntity)
          .set({ order: () => '"order" - 1' })
          .where('("order" between :el1 and :el2 )', {
            el1: taskOrderRangeToUpdate[0],
            el2: taskOrderRangeToUpdate[1],
          })
          .andWhere('board_column_type_id = :columnId', {
            columnId: columnId,
          })
          .execute();
      }

      await this.taskOrderRepository.update(
        { taskId },
        { order: order, boardColumnType: columnId },
      );
    }
  }
  async remove(id: number): Promise<void> {
    await this.taskRepository.delete({ id });
  }

  async getHistory(taskId: number): Promise<HistoryItem[]> {
    const dbHistory = await this.taskHistoryRepository.find({
      where: { taskId },
      relations: { user: true, event: true, column: true },
      order: { dateCreated: 'desc' },
    });

    return dbHistory.map((el) => this.dbRecordToHistoryItem(el));
  }

  dbRecordToHistoryItem(dbHistory: TaskHistoryEntity): HistoryItem {
    return {
      id: dbHistory.id,
      userName: dbHistory.user?.name,
      eventName: dbHistory.event.name,
      dateCreated: dbHistory.dateCreated,
      column: dbHistory.column.name as TaskColumnName,
    };
  }
}
