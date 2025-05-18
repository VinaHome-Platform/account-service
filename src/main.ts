import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST_ACCOUNT_SERVICE,
        port: 4001,
      },
    },
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen();
  console.log('✅ Account Service is running');
}
bootstrap();
