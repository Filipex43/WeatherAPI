// weather.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private apiKey = '4a219a4d1d004734885223007230809';

  async getWeather(city: string): Promise<any> {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
    
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get weather data: ${error.message}`);
    }
  }
}
