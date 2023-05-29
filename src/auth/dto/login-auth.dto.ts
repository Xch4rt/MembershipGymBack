import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {

    @ApiProperty({
        description: 'The username of the user',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user, min length 8',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
