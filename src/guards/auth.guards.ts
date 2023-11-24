import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly UserService: UserService
    ){}

    async canActivate(context: ExecutionContext){

        const request = context.switchToHttp().getRequest().headers;
        const {authorization} = request.headers;
        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);

            request.tokenPayload = data;

            request.user = await this.UserService.findOne(data.id);

            return true;
        } catch (e) {
            return false;
        }
    }
}