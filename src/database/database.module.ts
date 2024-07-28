import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const env = (name: string) => configService.get<string>(name);
        const ca = env('DB_CERTIFICATE');
        return {
          type: 'postgres',
          host: env('DB_HOST'),
          port: Number(env('DB_PORT')),
          database: env('DB_NAME'),
          username: env('DB_USERNAME'),
          password: env('DB_PASSWORD'),
          synchronize: true,
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          ssl: ca ? { ca } : true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
