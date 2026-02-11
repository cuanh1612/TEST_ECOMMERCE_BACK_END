import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getUserByEmail(email: string): Promise<User | null> {
        const foundUser = await this.userRepository.findOne({
            where: {
                email
            }
        })

        return foundUser
    }

    async create(input: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create({
            ...input
        })

        return this.userRepository.save(newUser)
    }
}
