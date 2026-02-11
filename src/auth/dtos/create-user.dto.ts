import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'huynqdev1612@gmail.com',
        description: 'email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'huydev1612',
        description: 'password',
    })
    @IsNotEmpty()
    password: string;
}