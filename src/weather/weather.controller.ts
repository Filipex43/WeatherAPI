// weather.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherGuard } from './weather.guard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  @UseGuards(WeatherGuard) // Use the guard to control access
  async getWeather(@Param('city') city: string): Promise<any> {
    return this.weatherService.getWeather(city);
  }
}
