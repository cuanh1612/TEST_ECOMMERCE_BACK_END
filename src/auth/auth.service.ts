import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/users/entities/user.entity';
import { UsersService } from 'src/models/users/users.service';
import { AuthPayload } from './interfaces/aut-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) { }

    //function hash password
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async comparePassword(
        password: string,
        storePasswordHash: string,
    ): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }

    async authentication(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) return false

        const check = await this.comparePassword(password, user.password);
        if (!check) return false;

        return user;
    }

    async login(user: User) {
        const payload: AuthPayload = {
            name: user.name,
            email: user.email,
            id: user.id,
        };

        return { access_token: this.jwtService.sign(payload) };
    }
}
