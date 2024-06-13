import { Module } from '@nestjs/common';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';

import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [EnvironmentConfigModule],
})
export class LoggerModule {}
