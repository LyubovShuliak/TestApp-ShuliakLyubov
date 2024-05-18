import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskEntity } from './Task.entity';
import { UpdateEvent } from './UpdateEvent.entity';
import { UserEntity } from './User.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'update_history' })
export class TaskHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamp', name: 'date_created' })
  dateCreated: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
  @Column({ type: 'int', name: 'user_id' })
  userId: number;
  @Column({ type: 'int', name: 'task_id' })
  taskId: number;
  @Column({ type: 'int', name: 'event_id' })
  eventId: number;
  @OneToOne(() => UpdateEvent, (event) => event.id)
  event: UpdateEvent;
  @ManyToOne(() => TaskEntity, (task) => task.id)
  task: TaskEntity;
}
