// // auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.userService.findByEmail(email);

//     if (user && user.password === password) {
//       const { password, ...result } = user;
//       return result;
//     }

//     return null;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "src/User/User.service";
import { Repository } from "typeorm";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{

    private issuer = 'login';
    private audience = 'Users';

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private UserRepository: Repository<User>,
        private readonly UserService: UserService
    ) {}

    createToken(user:User){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "3 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    checkToken(token: string){
        try {
            const data = this.jwtService.verify(token, {
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

    async login(email: string, password:string) {
        const user = await this.UserRepository.findOne({
            where: {
               email 
            }
        })

        if (!user) {
            throw new UnauthorizedException(`Email e/ou Senha foram preenchidos de forma incorreta.`);
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException(`Email e/ou Senha foram preenchidos de forma incorreta.`);
        }

        return this.createToken(user);
    }
    
    async forget(email: string) {
        const user = await this.UserRepository.findOne({
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
            const data: any = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: this.audience
            })

            if (isNaN(Number(data.id))) {
                throw new BadRequestException("Token inválido!");
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt)

            await this.UserRepository.update(Number(data.id), {
                password
            });

            const user = await this.UserService.findOne(Number(data.id));
    
            return this.createToken(user);

        } catch (e) {
            throw new BadRequestException(e);
        }

        

        
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.UserService.create(data);

        return this.createToken(user);
    }
}