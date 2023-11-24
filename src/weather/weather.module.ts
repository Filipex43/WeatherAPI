// weather.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { User } from "../user/entities/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [WeatherController],
  providers: [WeatherService, UserService],
  imports: [HttpModule, AuthModule, TypeOrmModule.forFeature([User])],
  exports: [WeatherService],
})
export class WeatherModule {}
