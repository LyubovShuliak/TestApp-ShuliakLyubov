import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from '../common/config/typeorm/entities/Board.entity';
import { BoardColumnType } from '../common/config/typeorm/entities/BoardColumnTypes.entity';
import { CommentEntity } from '../common/config/typeorm/entities/Comment.entity';
import { Event } from '../common/config/typeorm/entities/Event.entity';
import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { TaskHistoryEntity } from '../common/config/typeorm/entities/TaskHistory.entity';
import { TaskOrderEntity } from '../common/config/typeorm/entities/TaskOrder.entity';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      TaskHistoryEntity,
      TaskOrderEntity,
      Event,
      BoardColumnType,
      BoardEntity,

      CommentEntity,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
