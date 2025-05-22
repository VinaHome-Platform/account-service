import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const tempApp = await NestFactory.create(AppModule);
  const configService = tempApp.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('connection.host'),
        port: configService.get<number>('connection.port'),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
  console.log('✅ Account Service is running');
}
bootstrap();
