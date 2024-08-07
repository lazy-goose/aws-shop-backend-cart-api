import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

const PORT = 4000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const cfgService = app.get(ConfigService);
  const env = (name: string, def?: string) => cfgService.get<string>(name, def);

  app.enableCors({
    origin: env('FRONTEND_ORIGIN'),
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    maxAge: 86400,
  });

  app.use(helmet());
  await app.listen(PORT);
};

bootstrap().then(() => {
  console.log('The app has been started on port:', PORT);
});
