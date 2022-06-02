import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

const logger = new Logger('Main')
const configService = new ConfigService()

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672/'],
      noAck: false,
      queue: 'notificacoes'
    },
  });

  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();
