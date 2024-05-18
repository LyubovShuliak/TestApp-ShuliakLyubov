import { TaskHistoryEntity } from '../../common/config/typeorm/entities/TaskHistory.entity';

export class Task {
  board: number;
  user: number;
  title: string;
  description: string;
  status: number;
  order: number;
  history: TaskHistoryEntity[];
}
