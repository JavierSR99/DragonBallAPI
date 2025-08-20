import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {

    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres' })
    password: string;
}