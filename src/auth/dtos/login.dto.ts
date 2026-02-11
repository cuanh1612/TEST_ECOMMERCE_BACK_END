import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'huynqdev1612@gmail.com',
        description: 'email',
    })
    @IsString()
    email: string;

    @ApiProperty({
        example: 'huydev1612',
        description: 'Password',
    })
    @IsString()
    password: string;
}