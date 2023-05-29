import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto extends PartialType(LoginAuthDto) {

    @ApiProperty({
        description: 'The name of the user',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        description: 'The email of the user',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    email: string
}
