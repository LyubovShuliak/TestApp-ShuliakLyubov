import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommentEntity } from './Comment.entity';
import { TaskHistoryEntity } from './TaskHistory.entity';
@Entity({ database: process.env.DATABASE_NAME, name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, name: 'title', unique: false })
  title: string;

  @Column({ type: 'varchar', length: 255, name: 'description', unique: false })
  description: string;
  @Column({ type: 'int', name: 'board_id', unique: false })
  board: number;
  @Column({ type: 'int', name: 'board_column_type_id', unique: false })
  boardColumnType: number;
  @OneToMany(() => TaskHistoryEntity, (history) => history.id)
  history: TaskHistoryEntity[];
  @OneToMany(() => CommentEntity, (comment) => comment.id)
  comments: CommentEntity[];
}
