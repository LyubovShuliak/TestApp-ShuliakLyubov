import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BoardModule } from './board/board.module';
import { TypeOrmConfigModule } from './common/config/typeorm/typeorm.module';
import { jwtConstants } from './common/constants/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

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
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
