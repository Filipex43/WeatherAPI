
import { Body, Controller, Post, UseGuards, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly UserService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        const token = await this.authService.login(email, password);
        return { token };
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO){
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() request) {
        return { user: request.user };
    }
}