import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { jwtConstants } from '../common/constants/jwt';
import { AuthUser } from '../common/decorators/user.decorator';
import { JwtGuard } from '../common/guards/jwt.gaurd';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @Post('oauth2callback')
  @UseGuards(JwtGuard)
  async oauthCallback(
    @Body() { code }: { code: string },
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const user = await this.usersService.authorize(code);
    res.cookie(
      'session',
      this.jwtService.sign(user, {
        expiresIn: '1d',
        secret: jwtConstants.secret,
      }),
      {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        signed: process.env.NODE_ENV === 'production',
      },
    );
    res.cookie('status', true, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      signed: process.env.NODE_ENV === 'production',
    });

    return { name: user.name, status: true };
  }

  @Post()
  async createAnonymousUser(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @AuthUser() user: User,
  ) {
    if (user) return user;

    const anonymousUser = await this.usersService.createAnonymous();

    res.cookie(
      'session',
      this.jwtService.sign(anonymousUser, {
        expiresIn: '1d',
        secret: jwtConstants.secret,
      }),
      {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        signed: process.env.NODE_ENV === 'production',
      },
    );

    return { ...anonymousUser, status: false };
  }
  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
