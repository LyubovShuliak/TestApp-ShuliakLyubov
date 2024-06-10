import { TaskCardData, TaskColumnName } from '../entities/task.entity';

export class CreateTaskDto {
  boardId: number;
  userId: number;
  title: string;
  description: string;
  status: number;
  order: number;
}

export interface CreatedTask {
  columnName: TaskColumnName;
  task: TaskCardData;
}
