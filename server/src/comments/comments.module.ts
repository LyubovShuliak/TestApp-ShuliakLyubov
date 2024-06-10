import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from '../common/config/typeorm/entities/Comment.entity';
import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, TaskEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
