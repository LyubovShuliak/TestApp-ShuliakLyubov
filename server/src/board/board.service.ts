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
  async search(query: string) {
    const boards = await this.boardRepository.find({
      where: { hash: Like(`%${query}%`) },
      select: { name: true },
    });
    return boards.map((board) => board.name);
  }
  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.boardRepository.update({ id: id }, updateBoardDto);
  }

  async remove(id: number) {
    return await this.boardRepository.delete({ id: id });
  }
}
