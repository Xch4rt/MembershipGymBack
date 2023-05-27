import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString, IsNotEmpty} from "class-validator";

export class CreateMemberDto {

    @ApiProperty({
        description: 'The name of the member',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The last name of the member',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        description: 'The email of the member',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The address of the member',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: 'The phone of the member',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

}
