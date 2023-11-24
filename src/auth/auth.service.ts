import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    private issuer = 'login';
    private audience = 'Users';

    constructor(
        private readonly JwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly userService: UserService,
    ) {}

    private createToken(user: User) {
        return this.JwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, {
            expiresIn: "3 days",
            subject: String(user.id),
            issuer: this.issuer,
            audience: this.audience
        });
    }
    

    checkToken(token: string){
        try {
            const data = this.JwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.createToken(user);
        return token;
    }
    
    async forget(email: string) {
        const user = await this.userRepository.findOne({
            where: {
               email 
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail preenchido de forma incorreta.');
        }

        // enviar e-mail

        return true;
    }

    async reset(password: string, token: string) {
        try {
            const data: any = this.JwtService.verify(token, {
                issuer: 'forget',
                audience: this.audience
            })

            if (isNaN(Number(data.id))) {
                throw new BadRequestException("Token inválido!");
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt)

            await this.userRepository.update(Number(data.id), {
                password
            });

            const user = await this.userService.findOne(Number(data.id));
    
            return this.createToken(user);

        } catch (e) {
            throw new BadRequestException(e);
        }
        
    }

    async register(data: AuthRegisterDTO) {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        // Create a new user with the hashed password
        const user = await this.userService.create({
          name: data.name,
          email: data.email,
          password: hashedPassword,
        });
    
        if (!user) {
          throw new UnauthorizedException('E-mail ou senha preenchido de forma incorreta.');
        }
    
        return 'Usuario cadastrado com sucesso!';
      }

      async validateUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail preenchido de forma incorreta.');
        }

        return user
      }
}