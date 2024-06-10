import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { BoardEntity } from '../common/config/typeorm/entities/Board.entity';
import { BoardColumnType } from '../common/config/typeorm/entities/BoardColumnTypes.entity';
import { CommentEntity } from '../common/config/typeorm/entities/Comment.entity';
import { Event } from '../common/config/typeorm/entities/Event.entity';
import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { TaskHistoryEntity } from '../common/config/typeorm/entities/TaskHistory.entity';
import { TaskOrderEntity } from '../common/config/typeorm/entities/TaskOrder.entity';
import { EventName } from '../common/enums/event.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskColumnName } from './entities/task.entity';
import { TasksService } from './tasks.service';

import { createMock } from '@golevelup/ts-jest';

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: Repository<TaskEntity>;
  let taskHistoryRepository: Repository<TaskHistoryEntity>;
  let taskOrderRepository: Repository<TaskOrderEntity>;
  let updateEventsRepository: Repository<Event>;
  let boardColumnTypeRepository: Repository<BoardColumnType>;
  let boardRepository: Repository<BoardEntity>;
  let commentsRepository: Repository<CommentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useFactory: () =>
            createMock<Repository<TaskEntity>>({
              manager: {
                transaction: (
                  callback: (entityManager: EntityManager) => undefined,
                ) => undefined,
              },
            }),
        },
        {
          provide: getRepositoryToken(TaskHistoryEntity),
          useFactory: () => createMock<Repository<TaskHistoryEntity>>(),
        },
        {
          provide: getRepositoryToken(TaskOrderEntity),
          useFactory: () => createMock<Repository<TaskOrderEntity>>(),
        },
        {
          provide: getRepositoryToken(Event),
          useFactory: () => createMock<Repository<Event>>(),
        },
        {
          provide: getRepositoryToken(BoardColumnType),
          useFactory: () => createMock<Repository<BoardColumnType>>(),
        },
        {
          provide: getRepositoryToken(BoardEntity),
          useFactory: () => createMock<Repository<BoardEntity>>(),
        },
        {
          provide: getRepositoryToken(CommentEntity),
          useFactory: () => createMock<Repository<CommentEntity>>(),
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
    taskHistoryRepository = module.get<Repository<TaskHistoryEntity>>(
      getRepositoryToken(TaskHistoryEntity),
    );
    taskOrderRepository = module.get<Repository<TaskOrderEntity>>(
      getRepositoryToken(TaskOrderEntity),
    );
    updateEventsRepository = module.get<Repository<Event>>(
      getRepositoryToken(Event),
    );
    boardColumnTypeRepository = module.get<Repository<BoardColumnType>>(
      getRepositoryToken(BoardColumnType),
    );
    boardRepository = module.get<Repository<BoardEntity>>(
      getRepositoryToken(BoardEntity),
    );
    commentsRepository = module.get<Repository<CommentEntity>>(
      getRepositoryToken(CommentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task and return it', async () => {
      const createTaskDto: CreateTaskDto = {
        description: 'Test task description',
        boardId: 1,
        userId: 1,
        title: 'Test task title',
        status: 1,
        order: 1,
      };

      const column = { id: 1, name: 'ToDo' };
      const createdTask = { id: 1, ...createTaskDto, commentsCount: 0 };

      jest
        .spyOn(boardColumnTypeRepository, 'findOne')
        .mockResolvedValue(column as any);
      jest.spyOn(taskRepository, 'create').mockReturnValue(createdTask as any);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(createdTask as any);
      jest
        .spyOn(updateEventsRepository, 'findOne')
        .mockResolvedValue({ id: 1, name: EventName.TaskCreated } as any);
      jest.spyOn(taskHistoryRepository, 'create').mockReturnValue({} as any);
      jest.spyOn(taskHistoryRepository, 'save').mockResolvedValue({} as any);
      jest.spyOn(taskOrderRepository, 'create').mockReturnValue({} as any);
      jest.spyOn(taskOrderRepository, 'save').mockResolvedValue({} as any);

      const result = await service.create(createTaskDto);

      expect(result).toEqual({
        columnName: column.name,
        task: {
          description: createdTask.description,
          id: createdTask.id,
          commentsCount: createdTask.commentsCount,
          title: createdTask.title,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all tasks for a board', async () => {
      const boardId = 1;
      const dbTasks = [
        {
          taskId: 1,
          task: {
            id: 1,
            title: 'Task 1',
            commentsCount: 0,
            description: 'Description 1',
          },
          boardColumnType: 1,
          order: 1,
        },
        {
          taskId: 2,
          task: {
            id: 2,
            title: 'Task 2',
            commentsCount: 1,
            description: 'Description 2',
          },
          boardColumnType: 2,
          order: 2,
        },
      ];
      const columnsDB = [
        { id: 1, name: TaskColumnName.TODO },
        { id: 2, name: TaskColumnName.IN_PROGRESS },
      ];

      jest.spyOn(taskOrderRepository, 'find').mockResolvedValue(dbTasks as any);
      jest
        .spyOn(boardColumnTypeRepository, 'find')
        .mockResolvedValue(columnsDB as any);

      const result = await service.findAll(boardId);

      expect(result).toEqual({
        columns: {
          [TaskColumnName.TODO]: { columnId: 1, taskIds: [1] },
          [TaskColumnName.IN_PROGRESS]: { columnId: 2, taskIds: [2] },
        },
        tasks: {
          [TaskColumnName.TODO]: [
            {
              id: 1,
              title: 'Task 1',
              commentsCount: 0,
              description: 'Description 1',
            },
          ],
          ['In Progress']: [
            {
              id: 2,
              title: 'Task 2',
              commentsCount: 1,
              description: 'Description 2',
            },
          ],
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single task by id', async () => {
      const task = {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        board: 1,
        commentsCount: 0,
      };

      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(task as any);

      const result = await service.findOne(1);

      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should update a task and return it', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task 1' };
      const updatedTask = {
        id: 1,
        title: 'Updated Task 1',
        description: 'Description 1',
        board: 1,
        commentsCount: 0,
      };

      jest.spyOn(taskRepository, 'update').mockResolvedValue(null);
      jest
        .spyOn(taskRepository, 'findOne')
        .mockResolvedValue(updatedTask as any);

      const result = await service.update(1, updateTaskDto);

      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should remove a task and its related entities', async () => {
      const taskId = 1;

      jest.spyOn(taskRepository.manager, 'transaction');

      await taskRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.delete(CommentEntity, {
            taskId: taskId,
          });
          await transactionalEntityManager.delete(TaskHistoryEntity, {
            taskId: taskId,
          });
          await transactionalEntityManager.delete(TaskOrderEntity, {
            taskId: taskId,
          });
          await transactionalEntityManager.delete(TaskEntity, { id: taskId });
        },
      );
      await expect(service.remove(taskId)).resolves.toBeUndefined();
      // expect(transactionMock).toHaveBeenCalled();
    });
  });
});
