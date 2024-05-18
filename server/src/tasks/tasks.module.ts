import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { TaskHistoryEntity } from '../common/config/typeorm/entities/TaskHistory.entity';
import { TaskOrderEntity } from '../common/config/typeorm/entities/TaskOrder.entity';
import { UpdateEvent } from '../common/config/typeorm/entities/UpdateEvent.entity';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      TaskHistoryEntity,
      TaskOrderEntity,
      UpdateEvent,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
