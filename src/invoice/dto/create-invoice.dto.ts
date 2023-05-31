import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InvoiceDetailDto } from "./invoice-detail-dto";

export class CreateInvoiceDto {
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User Id',
        type: Number,
    })
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Member Id',
        type: Number,
    })
    memberId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Invoice Title',
        type: String,
    })
    invoiceTitle: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Payment Method',
        type: String,
    })
    paymentMethod: string;

    @IsString()
    @ApiProperty({
        description: 'Invoice Description',
        type: String,
    })
    invoiceDescription?: string;

    @ApiProperty({
        description: 'Invoice Details',
        type: [InvoiceDetailDto],
    })
    invoiceDetails: InvoiceDetailDto[];
}
