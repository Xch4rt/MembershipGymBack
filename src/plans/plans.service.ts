import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from '../prisma/prisma.service';
import { create } from 'domain';

@Injectable()
export class PlansService {
  constructor (private readonly prismaService: PrismaService) {}
  async create(createPlanDto: CreatePlanDto) {
    
    if (createPlanDto.name === '' || createPlanDto.description === '' ) {
      throw new HttpException('Fields are required', 400);
    }

    if (createPlanDto.price <= 0) {
      throw new HttpException('Price must be greater than 0', 400);
    }

    if (!createPlanDto.features) {
      throw new HttpException('Features are required', 400);
    }

    const plan = await this.prismaService.plan.create({
      data: {
        name: createPlanDto.name,
        description: createPlanDto.description,
        price: createPlanDto.price,
        features: JSON.stringify(createPlanDto.features),
      },
    });

    return plan;

    }


  findAll() {
    return `This action returns all plans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
