// weather.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  async getWeather(@Param('city') city: string): Promise<any> {
    return this.weatherService.getWeather(city);
  }
}
