import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

export class InvoiceDetailDto {

    @IsDecimal()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Invoice price',
        type: Number,
    })
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quantity',
        type: Number,
    })
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Plan Id',
        type: Number,
    })
    planId: number;
}