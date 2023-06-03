import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembershipService {
  constructor (private readonly prismaService: PrismaService) {}
  async create(createMembershipDto: CreateMembershipDto) {

    if (createMembershipDto.price < 0) {
      throw new Error('Price must be positive');
    }

    if (createMembershipDto.memberId < 0) {
      throw new Error('Member id must be positive');
    }


    const plan = await this.prismaService.plan.findUnique({
      where: {
        id: createMembershipDto.planId
      }
    });

    if (!plan) {
      throw new Error('Plan not found');
    }

    const member = await this.prismaService.member.findUnique({
      where: {
        id: createMembershipDto.memberId
      }
    });

    if (!member) {
      throw new Error('Member not found');
    }

    const membershipRegister = await this.prismaService.membership.create({
      data: {
        startDate: createMembershipDto.startDate,
        endDate: createMembershipDto.endDate,
        price: createMembershipDto.price,
        Plan: {
          connect: {
            id: createMembershipDto.planId
          }
        },
        member: {
          connect: {
            id: createMembershipDto.memberId
          }
        },
      }});

    return membershipRegister;
  }

  findAll() {
    return `This action returns all membership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} membership`;
  }

  update(id: number, updateMembershipDto: UpdateMembershipDto) {
    return `This action updates a #${id} membership`;
  }

  remove(id: number) {
    return `This action removes a #${id} membership`;
  }
}
