import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UpdateEventEnum {
  Reorder = 'Reordered',
  ChangedTitle = 'Title edited',
  ChangedDescription = 'Description edited',
  StatusChange = 'Status changed',
  BoardCreated = 'Board created',
  TaskCreated = 'Task created',
}

@Entity({ database: process.env.DATABASE_NAME, name: 'events' })
export class UpdateEvent {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
    enum: Object.values(UpdateEventEnum).filter((el) => typeof el === 'string'),
  })
  name: UpdateEventEnum;
}
