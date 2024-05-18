import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskHistoryEntity } from './TaskHistory.entity';
import { UserEntity } from './User.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'description', unique: false })
  text: string;
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
  @OneToMany(() => TaskHistoryEntity, (history) => history.id)
  history: TaskHistoryEntity[];
}
