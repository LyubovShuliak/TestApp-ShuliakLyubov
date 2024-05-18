import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BoardEntity } from './Board.entity';
import { TaskEntity } from './Task.entity';
@Entity({ database: process.env.DATABASE_NAME, name: 'tasks_order' })
export class TaskOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  order: number;
  @Column({ type: 'int', name: 'task_id' })
  taskId: number;
  @Column({ type: 'int', name: 'board_id' })
  boardId: number;
  @OneToOne(() => TaskEntity, (task) => task.id, { nullable: false })
  task: TaskEntity;
  @OneToOne(() => BoardEntity, (board) => board.id, { nullable: false })
  board: BoardEntity;
}
