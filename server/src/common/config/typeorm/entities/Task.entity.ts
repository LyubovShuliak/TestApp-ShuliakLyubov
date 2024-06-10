import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BoardEntity } from './Board.entity';
import { CommentEntity } from './Comment.entity';
import { TaskHistoryEntity } from './TaskHistory.entity';
import { TaskOrderEntity } from './TaskOrder.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'title', unique: false })
  title: string;

  @Column({ type: 'varchar', length: 255, name: 'description', unique: false })
  description: string;

  @Column({ type: 'int', name: 'board_id', unique: false })
  boardId: number;

  @ManyToOne(() => BoardEntity, (board) => board.tasks, {
    onDelete: 'CASCADE', // Allow cascading delete on BoardEntity side
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  board: BoardEntity;

  @Column({
    type: 'int',
    name: 'comments_count',
    unique: false,
    nullable: true,
  })
  commentsCount: number;

  @OneToMany(() => TaskHistoryEntity, (history) => history.task, {
    cascade: true, // Enable cascading delete
  })
  history: TaskHistoryEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.task, {
    cascade: true, // Enable cascading delete
  })
  comments: CommentEntity[];

  @OneToMany(() => TaskOrderEntity, (taskOrder) => taskOrder.task, {
    cascade: true, // Enable cascading delete
  })
  taskOrders: TaskOrderEntity[];
}
