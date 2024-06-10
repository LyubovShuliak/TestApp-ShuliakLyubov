import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EventName } from '../../../enums/event.enum';

@Entity({ database: process.env.DATABASE_NAME, name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
    enum: Object.values(EventName).filter((el) => typeof el === 'string'),
  })
  name: EventName;
}
