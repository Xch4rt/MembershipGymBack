import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMembershipDto {
    
    @ApiProperty({
        description: 'Start date of the membership',
        type: Date,
    })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({
        description: 'End date of the membership',
        type: Date,
    })
    @IsDate()
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
        description: 'Name of the membership',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Description of the membership',
        type: String,
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Features of the membership',
        type: JSON,
    })
    @IsJSON()
    @IsNotEmpty()
    features: JSON;

    @ApiProperty({
        description: 'Price of the membership',
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    pricePlan: number;
}
