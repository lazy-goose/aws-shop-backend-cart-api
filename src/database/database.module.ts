import path from 'path';
import fs from 'fs';
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
        const isDev = env('NODE_ENV') === 'development';
        // prettier-ignore
        const localCert = path.resolve(process.cwd(), 'certificates', 'eu-north-1-bundle.pem');
        return {
          type: 'postgres',
          host: env('DB_HOST'),
          port: Number(env('DB_PORT')),
          database: env('DB_NAME'),
          username: env('DB_USERNAME'),
          password: env('DB_PASSWORD'),
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: false,
          ssl: isDev ? { ca: fs.readFileSync(localCert).toString() } : true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
