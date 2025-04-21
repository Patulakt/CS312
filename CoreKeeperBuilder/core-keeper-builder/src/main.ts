
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap'); 


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            
    forbidNonWhitelisted: true,
    transform: true,        
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();