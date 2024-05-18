import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../common/guards/jwt.gaurd';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<
    | { name: string; hash: string }
    | UnprocessableEntityException
    | BadRequestException
  > {
    if (!createBoardDto.name) {
      return new UnprocessableEntityException('Name is empty');
    }
    try {
      const createdBoard = await this.boardService.create(createBoardDto);
      if (createdBoard) {
        return createdBoard;
      }
    } catch (e) {
      return new BadRequestException('Board not saved. Try later.');
    }
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }
  @Get('search/:query')
  async search(@Param('query') query: string) {
    return await this.boardService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
