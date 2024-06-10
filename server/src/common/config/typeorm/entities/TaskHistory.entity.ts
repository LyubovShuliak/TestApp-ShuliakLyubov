import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BoardColumnType } from './BoardColumnTypes.entity';
import { Event } from './Event.entity';
import { TaskEntity } from './Task.entity';
import { UserEntity } from './User.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'update_history' })
export class TaskHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'timestamp', name: 'date_created' })
  dateCreated: string;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;
  @Column({ type: 'int', name: 'task_id' })
  taskId: number;
  @Column({ type: 'int', name: 'event_id', unique: false })
  eventId: number;
  @Column({ type: 'int', name: 'column_id', unique: false })
  columnId: number;
  @OneToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id', referencedColumnName: 'id' })
  event: Event;
  @OneToOne(() => BoardColumnType, (column) => column.id)
  @JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
  column: BoardColumnType;
  @ManyToOne(() => TaskEntity, (task) => task.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  task: TaskEntity;
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
