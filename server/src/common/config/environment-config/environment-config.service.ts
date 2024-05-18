import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getCacheTTL(): number {
    return this.configService.get<number>('CACHE_TTL');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }
  getRedisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  getRabbitURL(): string {
    return this.configService.get<string>('RABBITMQ_URL');
  }
  getRabbitQueue(): string {
    return this.configService.get<string>('RABBITMQ_QUEUE');
  }
  getRedisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD');
  }
  getJWTSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
  getGraphUrl(): string {
    return this.configService.get<string>('GRAPH_API_URL');
  }

  getContactsServicePort(): number {
    try {
      return this.configService.getOrThrow<number>('CONTACTS_PORT');
    } catch (e) {
      return this.configService.get<number>('PORT');
    }
  }
  getContactsServiceUrl() {
    return this.configService.get<string>('CONTACTS_URL');
  }

  getServerUrl() {
    return this.configService.get<string>('SERVER_URL');
  }

  getProjectId(): string {
    return this.configService.get<string>('GCP_PROJECT');
  }
  getQueueName(): string {
    return this.configService.get<string>('QUEUE_NAME');
  }
  getQueueLocation(): string {
    return this.configService.get<string>('LOCATION');
  }

  getPort(): number {
    return this.configService.get<number>('PORT');
  }

  getNodeEnvironment(): string {
    return this.configService.get<string>('NODE_ENV');
  }
  getInviteUrl(): string {
    return this.configService.get<string>('INVITE_URL');
  }
  getPubSubTopic(): string {
    return this.configService.get<string>('TOPIC');
  }
  getPubSubSubscription(): string {
    return this.configService.get<string>('SUBSCRIPTION');
  }
  getCORSOrigin(): string {
    return this.configService.get<string>('ORIGIN');
  }
  getCloudTasksQueueName(): string {
    return this.configService.get<string>('QUEUE_NAME_CLOUD_TASKS');
  }
  getCloudTasksLocation(): string {
    return this.configService.get<string>('LOCATION_CLOUD_TASKS');
  }
  getGoogleApiUrl(): string {
    return this.configService.get<string>('GOOGLE_API_URL');
  }

  getCacheRedisHost(): string {
    return this.configService.get<string>('CACHE_REDIS_HOST');
  }

  getCacheRedisPassword(): string {
    return this.configService.get<string>('CACHE_REDIS_PASSWORD');
  }

  getCacheRedisPort(): string {
    return this.configService.get<string>('CACHE_REDIS_PORT');
  }

  getCacheRedisUser(): string {
    return this.configService.get<string>('CACHE_REDIS_USER');
  }
}
