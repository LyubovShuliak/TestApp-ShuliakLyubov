import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UsersModule, BoardModule],
})
export class AppModule {}
