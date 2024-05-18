import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { LoggerModule } from '../../logger/logger.module';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

import { BoardEntity } from './entities/Board.entity';
import { CommentEntity } from './entities/Comment.entity';
import { TaskEntity } from './entities/Task.entity';
import { TaskHistoryEntity } from './entities/TaskHistory.entity';
import { TaskOrderEntity } from './entities/TaskOrder.entity';
import { UpdateEvent } from './entities/UpdateEvent.entity';
import { UserEntity } from './entities/User.entity';

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
    UpdateEvent,
    TaskHistoryEntity,
    CommentEntity,
  ],
  migrations: [],
  // migrationsRun: false,
  // cache: false,
  synchronize: true,
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
        const da = await new DataSource(options).initialize();

        return da;
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
