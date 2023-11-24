import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        JwtModule.register({
            secret: 'cded48d06f96c5b5b68c61796c2d1c8b42373fbf8dab9fa9beffb172df1a004d',
        }),
        forwardRef(() => UserModule),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}