import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board_column_types')
export class BoardColumnType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  stage: number;
}
