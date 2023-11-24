// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
// import { JwtModule } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// @Module({
//   imports: [
//     JwtModule.register({
//       secret: 'your-secret-key',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   providers: [AuthService, LocalStrategy, UserService],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: String(process.env.JWT_SECRET)
        }),
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {

}