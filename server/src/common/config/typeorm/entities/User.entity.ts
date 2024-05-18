import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TaskHistoryEntity } from './TaskHistory.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: false, name: 'name' })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true, name: 'uid' })
  uid: string;

  @OneToMany(() => TaskHistoryEntity, (history) => history.id)
  history: TaskHistoryEntity[];
}
