import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/models/user.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './models/dto/register.dto';
import { hashPlainText, comparePlainToHash } from 'src/common/utils/bcrypt.util';
import { LoginAuthDto } from './models/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly _jwt: JwtService
    ) {}

    //#region PUBLIC METHODS
    public async registerUser(userDto: RegisterAuthDto): Promise<UserDocument> {
        const { email, password, ...rest } = userDto;

        const existingUser = await this.checkExistingUser(email);

        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }

        const hashedPassword = await hashPlainText(password);

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            ...rest,
        });

        return newUser.save();
    }

    public async loginUser(userDto: LoginAuthDto) {
        const { email, password } = userDto;

        const existingUser = await this.checkExistingUser(email);

        // comprobamos que el email esté vinculado a un usuario existente
        if (!existingUser) {
            throw new UnauthorizedException('El email no pertenece a ningún usuario');
        }


        // validamos la contraseña
        const correctPassword = await comparePlainToHash(password, existingUser.password);

        if (!correctPassword) {
            throw new ConflictException('Email o contraseña incorrectos');
        }

        // montamos payload para crear JWT
        const payload = {
            id: existingUser.id,
            username: existingUser.username,
            roles: existingUser.roles
        };
        const token = this._jwt.sign(payload);

        return token;
    }
    // #endregion

    //#region PRIVATE METHODS

    private async checkExistingUser(email: string): Promise<UserDocument | null> {
        const user = await this.userModel.findOne({ email });

        return user;
    }

    //#endregion

}
