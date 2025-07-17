import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(20)
    password: string;
}