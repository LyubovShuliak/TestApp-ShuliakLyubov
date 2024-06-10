import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskEntity } from './Task.entity';
import { UserEntity } from './User.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'description', unique: false })
  text: string;

  @Column({ type: 'int', name: 'task_id', unique: false })
  taskId: number;
  @Column({ type: 'int', name: 'user_id', unique: false })
  userId: number;
  @Column({ type: 'timestamp', name: 'date_created' })
  dateCreated: string;
  @ManyToOne(() => TaskEntity, (task) => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  task: TaskEntity;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
