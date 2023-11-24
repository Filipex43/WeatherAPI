// // auth.controller.ts
// import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard'; // You'll need to create this guard

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
// }

import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../guards/auth.guards";
import { User } from "../user/entities/user.entity";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly UserService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() {email, senha}: AuthLoginDTO){
        return this.authService.login(email, senha)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {senha, token}: AuthResetDTO){
        return this.authService.reset(senha, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() request) {
        return { user: request.user };
    }
}