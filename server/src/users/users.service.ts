import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'node:crypto';
import { Repository } from 'typeorm';

import { UserEntity } from '../common/config/typeorm/entities/User.entity';

import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // async authorize(code: string): Promise<{ name: string }> {
  //   const oauth2Client = new google.auth.OAuth2(
  //     process.env.GOOGLE_CLIENT_ID,
  //     process.env.GOOGLE_CLIENT_SECRET,
  //     process.env.ORIGIN,
  //   );
  //   const { tokens } = await oauth2Client.getToken(code);
  //   const idToken = await oauth2Client.verifyIdToken({
  //     idToken: tokens.id_token,
  //   });
  //   const profileInfo = idToken.getPayload();
  //
  //   const user = this.userRepository.create({
  //     name: profileInfo.name,
  //     uid: profileInfo.sub,
  //   });
  //
  //   await this.userRepository
  //     .createQueryBuilder()
  //     .insert()
  //     .values(user)
  //     .orIgnore()
  //     .execute();
  //
  //   return { name: profileInfo.name };
  // }

  generateRandomString(length: number) {
    return crypto
      .randomBytes(length)
      .toString('base64')
      .replace(/[+/=]/g, '')
      .substring(0, length);
  }

  generateRandomUsernameAndId() {
    const usernamePrefix = 'Anonyme';
    const usernameSuffix = this.generateRandomString(5);
    const name = `${usernamePrefix}${usernameSuffix}`;

    return { name, id: Date.now() };
  }

  async createAnonymous() {
    const anonymousAuth = this.generateRandomUsernameAndId();
    const user = this.userRepository.create({
      name: anonymousAuth.name,
      uid: String(anonymousAuth.id),
    });

    const userDB = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values(user)
      .orIgnore()
      .execute();
    return { name: anonymousAuth.name, id: user.id };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
