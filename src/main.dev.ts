import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

const port = process.env.PORT || 4000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const cfgService = app.get(ConfigService);
  const env = (name: string, def?: string) => cfgService.get<string>(name, def);

  app.enableCors({
    origin: env('LOCALDEV_ORIGIN', 'http://localhost:3000'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.use(helmet());
  await app.listen(port);
};

bootstrap().then(() => {
  console.log('Api url: ', `http://localhost:${port}`);
});
