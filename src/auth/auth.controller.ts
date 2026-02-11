import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UsersService } from 'src/models/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) { }

    //handle login
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ApiBody({ type: LoginDto })
    async login(@Request() request): Promise<any> {
        return this.authService.login(request.user);
    }

    //fucntion register user
    @Post('/register')
    async registerUser(@Body() input: CreateUserDto) {
        const check = await this.validate(input.email);
        if (!check) {
            throw new HttpException(
                { message: 'User already exists' },
                HttpStatus.BAD_REQUEST,
            );
        }

        input.password = await this.authService.hashPassword(input.password);
        return this.userService.create(input);
    }

    async validate(email: string) {
        const user = await this.userService.getUserByEmail(email);
        return !user;
    }
}
