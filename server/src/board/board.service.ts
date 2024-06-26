import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Like, Repository } from 'typeorm';

import { BoardEntity } from '../common/config/typeorm/entities/Board.entity';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardRepository.create({
      name: createBoardDto.name,
      hash: nanoid(),
    });

    await this.boardRepository.save(newBoard);
    return { name: newBoard.name, hash: newBoard.hash, id: newBoard.id };
  }

  async findAll() {
    return await this.boardRepository.find({});
  }

  async findOne(id: number) {
    return await this.boardRepository.findOne({ where: { id: id } });
  }
  async findOneByHash(hash: string) {
    return await this.boardRepository.findOne({ where: { hash: hash } });
  }
  async search(query: string) {
    return await this.boardRepository.find({
      where: [{ name: Like(`%${query}%`) }, { hash: Like(`%${query}%`) }],
      select: { name: true, hash: true, id: true },
    });
  }
  async update(id: number, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update({ id: id }, updateBoardDto);
    return await this.boardRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.boardRepository.delete({ id: id });
  }
}
