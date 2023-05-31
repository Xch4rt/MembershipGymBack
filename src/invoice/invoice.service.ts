import { HttpException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {

    if (createInvoiceDto.userId <= 0 || createInvoiceDto.memberId <= 0) {
      throw new HttpException('User Id or Member Id must be greater than 0', 400);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: createInvoiceDto.userId },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const member = await this.prismaService.member.findUnique({
      where: { id: createInvoiceDto.memberId },
    });

    if (!member) {
      throw new HttpException('Member not found', 404);
    }


    const invoice = await this.prismaService.invoice.create({
      data: {
        paymentMethod: createInvoiceDto.paymentMethod,
        paymentDate: new Date(),
        invoiceTitle: createInvoiceDto.invoiceTitle,
        description: createInvoiceDto.invoiceDescription,        
        User: { 
          connect: {
            id: createInvoiceDto.userId,
          },
        },
        Member: {
          connect: {
            id: createInvoiceDto.memberId,
          },
        },
        InvoiceDetails: {
          create: createInvoiceDto.invoiceDetails.map( invoiceDetail => {
            if (invoiceDetail.quantity <= 0) {
              throw new HttpException('Quantity must be greater than 0', 400);
            }
            if (invoiceDetail.price <= 0) {
              throw new HttpException('Price must be greater than 0', 400);
            }
            return {
              quantity: invoiceDetail.quantity,
              price: invoiceDetail.price,
            }
          }),
        },
      },
    });

    return invoice;
  }

  findAll() {
    return `This action returns all invoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
