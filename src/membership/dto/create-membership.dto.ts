import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMembershipDto {
    
    @ApiProperty({
        description: 'Start date of the membership',
        type: Date,
    })
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        description: 'End date of the membership',
        type: Date,
    })
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({
        description: 'Id of the member',
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    memberId: number;

    @ApiProperty({
        description: 'Id of the gym',
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: 'Id of the plan',
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    planId: number;
}
