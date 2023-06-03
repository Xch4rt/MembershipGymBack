import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber } from "class-validator";

export class InvoiceDetailDto {

    @IsDecimal()
    @ApiProperty({
        description: 'Invoice price',
        type: Number,
    })
    price: number;

    @IsNumber()
    @ApiProperty({
        description: 'Quantity',
        type: Number,
    })
    quantity: number;

    @IsNumber()
    @ApiProperty({
        description: 'Plan Id',
        type: Number,
    })
    planId: number;
}