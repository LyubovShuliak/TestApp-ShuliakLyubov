import { Module } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [EnvironmentConfigModule],
})
export class LoggerModule {}
