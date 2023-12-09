import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/roles.enum';

export class SignUpDto extends LoginAuthDto {

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

    @ApiProperty({
        description: 'The role of the user',
        enum: UserRole, // Especifica el enum para validar el valor del rol
    })
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}
