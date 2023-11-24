import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'cded48d06f96c5b5b68c61796c2d1c8b42373fbf8dab9fa9beffb172df1a004d',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
