import { Column } from '../board/board.types';

export enum TaskColumnName {
  TODO = 'TODO',
  IN_PROGRESS = 'In Progress',
  DONE = 'DONE',
}
export enum EventName {
  StatusChange = 'Status changed',
  TaskCreated = 'Task created',
}

export interface HistoryItem {
  id: number;
  userName: string;
  eventName: EventName;
  dateCreated: string;
  column: TaskColumnName;
}
export interface TaskTileData {
  id: number;
  title: string;
  commentsCount: number;
  description: string;
  history: HistoryItem[];
}
export interface CreatedTask {
  columnName: TaskColumnName;
  task: TaskTileData;
}

export interface TasksState {
  tasks: {
    [TaskColumnName.TODO]: TaskTileData[];
    [TaskColumnName.IN_PROGRESS]: TaskTileData[];
    [TaskColumnName.DONE]: TaskTileData[];
  };
  columns: {
    [TaskColumnName.TODO]: Column;
    [TaskColumnName.IN_PROGRESS]: Column;
    [TaskColumnName.DONE]: Column;
  };
  cachedState?: {
    tasks: {
      [TaskColumnName.TODO]: TaskTileData[];
      [TaskColumnName.IN_PROGRESS]: TaskTileData[];
      [TaskColumnName.DONE]: TaskTileData[];
    };
    columns: {
      [TaskColumnName.TODO]: Column;
      [TaskColumnName.IN_PROGRESS]: Column;
      [TaskColumnName.DONE]: Column;
    };
  };
  history: { [key: number]: HistoryItem[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CreateBoardData {
  name: string;
  // Add other properties if necessary
}
export interface UpdateTaskOrder {
  columnId: number;
  boardId: number;
  previousColumnId: number;
  order: number;
  previousOrder: number;
  taskId: number;
  userId: number;
}
export type ContextData = {
  source:
    | TaskColumnName.TODO
    | TaskColumnName.IN_PROGRESS
    | TaskColumnName.DONE;
  destination:
    | TaskColumnName.TODO
    | TaskColumnName.IN_PROGRESS
    | TaskColumnName.DONE;
  currentTaskIndex: number;
  futureTaskIndex: number;
  taskId: number;
};
export type TasksAndColumnsData = {
  tasks: { [key in TaskColumnName]: TaskTileData[] };
  columns: { [key in TaskColumnName]: Column };
};

export interface UpdateTask
  extends Partial<Omit<TaskTileData, 'commentsCount'>> {
  column: TaskColumnName;
  index: number;
  id: number;
}
export interface CreateTaskI {
  boardId: number;
  userId: number;
  title: string;
  description: string;
  status: number;
  order: number;
  date: Date;
}
