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
  Query,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req: Request,
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
  @Get('search')
  async search(@Query('query') query?: string) {
    return await this.boardService.search(query);
  }
  @Get('hash/:hash')
  findOneByHash(@Param('hash') hash: string) {
    return this.boardService.findOneByHash(hash);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return await this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
