import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'Nguyễn Quang Huy',
        description: 'Name',
    })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string;

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