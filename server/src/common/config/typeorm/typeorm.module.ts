import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { LoggerModule } from '../../logger/logger.module';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

import { BoardEntity } from './entities/Board.entity';
import { BoardColumnType } from './entities/BoardColumnTypes.entity';
import { CommentEntity } from './entities/Comment.entity';
import { Event } from './entities/Event.entity';
import { TaskEntity } from './entities/Task.entity';
import { TaskHistoryEntity } from './entities/TaskHistory.entity';
import { TaskOrderEntity } from './entities/TaskOrder.entity';
import { UserEntity } from './entities/User.entity';
import { Init1717962142925 } from './migrations/1717962142925-init';
export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),

  entities: [
    UserEntity,
    BoardEntity,
    TaskOrderEntity,
    TaskEntity,
    TaskHistoryEntity,
    CommentEntity,
    BoardColumnType,
    Event,
  ],
  migrations: [Init1717962142925],
  migrationsRun: true,
  // cache: false,
  // synchronize: true,
  logging: true,
  ssl: true,
});

@Module({
  imports: [
    EnvironmentConfigModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
