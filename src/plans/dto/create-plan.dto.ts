import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

class PlanFeatures {
    @ApiProperty({ type: String })
    f1: string;
  
    @ApiProperty({ type: String })
    f2: string;
  
    @ApiProperty({ type: String })
    f3: string;
}
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
        type: PlanFeatures,
    })
    @IsObject()
    @IsNotEmpty()
    features: PlanFeatures;


}

