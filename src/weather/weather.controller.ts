// src/weather/weather.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  @UseGuards(AuthGuard)
  async getWeather(@Param('city') city: string): Promise<any> {
    return this.weatherService.getWeather(city);
  }
}
