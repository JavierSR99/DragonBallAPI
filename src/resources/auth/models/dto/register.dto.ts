import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    @MaxLength(20, { message: 'El nombre de usuario no puede tener más de 20 caracteres' })
    username: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña no puede tener más de 20 caracteres' })
    password: string;
}