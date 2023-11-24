import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        try {
            const authorizationHeader = request.headers.authorization;
            console.log(`this is the resistance ${authorizationHeader}`)
            if (!authorizationHeader) {
                return false;
            }

            const token = authorizationHeader.split(' ')[1];
            const data = this.authService.checkToken(token);

            request.tokenPayload = data;

            const user = await this.userService.findOne(data.id);

            if (!user) {
                return false;
            }

            request.user = user;

            return true;
        } catch (e) {
            return false;
        }
    }
}

export default AuthGuard;
