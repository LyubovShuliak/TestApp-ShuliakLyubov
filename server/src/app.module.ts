import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BoardModule } from './board/board.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmConfigModule } from './common/config/typeorm/typeorm.module';
import { jwtConstants } from './common/constants/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

    UsersModule,
    BoardModule,
    TasksModule,
    CommentsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
