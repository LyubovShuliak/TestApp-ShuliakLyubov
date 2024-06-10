import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';

import { CommentEntity } from '../common/config/typeorm/entities/Comment.entity';
import { TaskEntity } from '../common/config/typeorm/entities/Task.entity';
import { DATE_FORMAT } from '../common/constants/date-format';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentI } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<number> {
    const b = moment(createCommentDto.dateCreated).format(DATE_FORMAT);
    const newComment = this.commentsRepository.create({
      taskId: createCommentDto.taskId,
      userId: createCommentDto.userId,
      text: createCommentDto.text,
      dateCreated: b.toString(),
    });

    const dbComment = await this.commentsRepository.save(newComment);
    await this.commentsRepository
      .createQueryBuilder()
      .update(TaskEntity)
      .set({ commentsCount: () => 'commentsCount + 1' })
      .where('id = :taskId', {
        taskId: createCommentDto.taskId,
      })
      .execute();
    return dbComment.id;
  }

  async findAll(taskId: number) {
    const comments = await this.commentsRepository.find({
      where: { taskId: taskId },
      relations: { user: true },
      order: { dateCreated: 'desc' },
    });

    return comments.map<CommentI>((comment) => ({
      comment: comment.text,
      commentId: comment.id,
      createdBy: comment.user.name,
      dateCreated: comment.dateCreated,
    }));
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepository.update(
      { id: id },
      { text: updateCommentDto.text },
    );
  }

  remove(id: number) {
    return this.commentsRepository.delete({ id: id });
  }
}
