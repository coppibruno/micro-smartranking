import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import moment from 'moment';
import 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      //urls: ['amqp://user:q7W2UQk249gR@18.210.17.173:5672/smartranking'],
      urls: ['amqp://localhost:5672/'],
      noAck: false,
      queue: 'admin-backend',
    },
  });

  // Date.prototype.toJSON = function (): any {
  //   return moment(this)
  //     .tz('America/Sao_Paulo')
  //     .format('YYYY-MM-DD HH:mm:ss.SSS');
  // };

  await app.listen();
}
bootstrap();
