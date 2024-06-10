import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TaskEntity } from './Task.entity';
import { TaskOrderEntity } from './TaskOrder.entity';

@Entity({ database: process.env.DATABASE_NAME, name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'hash_id' })
  hash: string;

  @Column({ type: 'varchar', length: 255, unique: false, name: 'name' })
  name: string;

  @OneToMany(() => TaskEntity, (task) => task.board, {
    cascade: ['remove'],
  })
  tasks: TaskEntity[];

  @OneToMany(() => TaskOrderEntity, (taskOrder) => taskOrder.board, {})
  taskOrders: TaskOrderEntity[];
}
