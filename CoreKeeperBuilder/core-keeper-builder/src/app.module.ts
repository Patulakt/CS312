import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorModule } from './calculator.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
     DatabaseModule,
     CalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}