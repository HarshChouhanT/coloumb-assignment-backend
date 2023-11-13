import { Injectable } from '@nestjs/common';
import { ChartData } from './chart.model';
import { rawData } from './data';

@Injectable()
export class ChartService {
  chartData: ChartData[];

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.chartData = rawData.map((item) => {
      return {
        date: new Date(
          `${Number.parseInt(item.Day.split('/')[2])}-
          ${Number.parseInt(item.Day.split('/')[1]) - 1}-
          ${Number.parseInt(item.Day.split('/')[0])}`,
        ),
        age: item.Age,
        gender: item.Gender,
        a: Number.parseInt(item.A),
        b: Number.parseInt(item.B),
        c: Number.parseInt(item.C),
        d: Number.parseInt(item.D),
        e: Number.parseInt(item.E),
        f: Number.parseInt(item.F),
      };
    });
  }

  getChartData(
    startDate?: Date,
    endDate?: Date,
    age?: string,
    gender?: string,
  ): ChartData[] {
    let chartData = this.chartData;
    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      chartData = chartData.filter(
        (d) => d.date >= startDate && d.date <= endDate,
      );
    }
    console.info(
      'startDate, EndDate, age, gender',
      startDate,
      endDate,
      age,
      gender,
    );
    if (age && gender) {
      return chartData.filter((d) => d.age == age && d.gender == gender);
    } else if (age) {
      return chartData.filter((d) => d.age == age);
    } else if (gender) {
      return chartData.filter((d) => d.gender == gender);
    } else {
      return chartData;
    }
  }
}
