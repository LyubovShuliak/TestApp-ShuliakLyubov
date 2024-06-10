import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BoardEntity } from './Board.entity';
import { TaskEntity } from './Task.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'tasks_order' })
export class TaskOrderEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'int', name: 'board_column_type_id', unique: false })
  boardColumnType: number;

  @Column({ type: 'int', name: 'task_id' })
  taskId: number;

  @Column({ type: 'int', name: 'board_id' })
  boardId: number;

  @OneToOne(() => TaskEntity, (task) => task.taskOrders, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete', // Allow cascading delete on TaskEntity side
  })
  @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  task: TaskEntity;

  @ManyToOne(() => BoardEntity, (board) => board.taskOrders, {
    // Allow cascading delete on BoardEntity side
  })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  board: BoardEntity;
}
