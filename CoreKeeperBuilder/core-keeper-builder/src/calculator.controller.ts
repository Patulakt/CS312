import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculateStatsDto } from './calculator/dto/calculate-stats.dto';
import { TotalStatsDto } from './calculator/dto/total-stats.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  calculateBuildStats(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
    calculateStatsDto: CalculateStatsDto,
  ): TotalStatsDto {
    return this.calculatorService.calculateTotalStats(calculateStatsDto);
  }
}