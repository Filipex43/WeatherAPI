// weather.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [HttpModule], // Import HttpModule if HttpService is used
})
export class WeatherModule {}
