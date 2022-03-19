// request-> middleware -> interceptior -> pipe-> controller -> service -> interceptor -> exception -> response
// - interceptor: 성공 시 res 응답 형식을 정함
// - exception filter: 실패 시 res 응답 형식을 정함

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
