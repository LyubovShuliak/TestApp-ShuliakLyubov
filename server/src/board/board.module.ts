import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardEntity } from '../common/config/typeorm/entities/Board.entity';
import { CommentEntity } from '../common/config/typeorm/entities/Comment.entity';
import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { TaskHistoryEntity } from '../common/config/typeorm/entities/TaskHistory.entity';
import { UpdateEvent } from '../common/config/typeorm/entities/UpdateEvent.entity';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BoardEntity,
      TaskEntity,
      TaskHistoryEntity,
      CommentEntity,
      UpdateEvent,
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
