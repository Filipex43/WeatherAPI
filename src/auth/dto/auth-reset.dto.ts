import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
    
    @IsStrongPassword({
        minLength: 4,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
        minLowercase: 0
    })
    senha: string;

    @IsJWT()
    token: string
}