import { CommentEntity } from '../../common/config/typeorm/entities/Comment.entity';
import { EventName } from '../../common/enums/event.enum';
export enum TaskColumnName {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'DONE',
}
export class Task {
  board: number;
  user: number;
  title: string;
  description: string;
  status: number;
  order: number;

  comments: CommentEntity[];
}
export type HistoryItem = {
  id: number;
  userName: string;
  eventName: EventName;
  dateCreated: string;
  column: TaskColumnName;
};
export interface TaskCardData {
  id: number;
  title: string;
  commentsCount: number;
  description: string;
  history: HistoryItem[];
}

export type GetTasksResponse = {
  tasks: {
    [TaskColumnName.TODO]: TaskCardData[];
    [TaskColumnName.IN_PROGRESS]: TaskCardData[];
    [TaskColumnName.DONE]: TaskCardData[];
  };
  columns: {
    [TaskColumnName.TODO]: { taskIds: number[]; columnId?: number };
    [TaskColumnName.IN_PROGRESS]: { taskIds: number[]; columnId?: number };
    [TaskColumnName.DONE]: { taskIds: number[]; columnId?: number };
  };
};
