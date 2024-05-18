import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ database: process.env.DATABASE_NAME, name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true, name: 'hash_id' })
  hash: string;
  @Column({ type: 'varchar', length: 255, unique: false, name: 'name' })
  name: string;
}
