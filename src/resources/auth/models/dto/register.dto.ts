import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    email: string;

    @MinLength(3)
    @MaxLength(20)
    username: string;

    @MinLength(8)
    @MaxLength(20)
    password: string;
}