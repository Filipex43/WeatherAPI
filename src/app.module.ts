import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [UserModule, WeatherModule, AuthModule,TypeOrmModule.forRoot(config)],
  controllers: [AppController, UserController, WeatherController],
  providers: [AppService],
})
export class AppModule {}
