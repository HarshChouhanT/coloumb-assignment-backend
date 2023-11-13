import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChartService } from './chart.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chart')
export class ChartController {
  constructor(private chartService: ChartService) {}

  @UseGuards(AuthGuard)
  @Get('data')
  getChartData(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('age') age?: string,
    @Query('gender') gender?: string,
  ) {
    return this.chartService.getChartData(startDate, endDate, age, gender);
  }
}
