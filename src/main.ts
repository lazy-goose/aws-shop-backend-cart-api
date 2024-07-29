import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';
import serverlessExpress from '@codegenie/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfgService = app.get(ConfigService);
  const env = (name: string, def?: string) => cfgService.get<string>(name);

  app.enableCors({
    origin: env('FRONTEND_ORIGIN'),
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    maxAge: 86400,
  });

  app.use(helmet());
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('Handler event', event);
  server = server ?? (await bootstrap());
  console.log('Server has been started...');
  return server(event, context, callback);
};
