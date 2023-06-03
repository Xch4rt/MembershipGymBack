import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlanDto {

    @ApiProperty({
        description: 'Plan name',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Plan description',
        type: String,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Plan price',
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @ApiProperty({
        description: 'Plan features',
        type: Object,
    })
    @IsJSON()
    @IsNotEmpty()
    features: object;


}
