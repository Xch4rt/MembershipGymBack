import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembershipService {
  constructor (private readonly prismaService: PrismaService) {}
  async create(createMembershipDto: CreateMembershipDto) {

    if (createMembershipDto.price < 0 || createMembershipDto.pricePlan < 0) {
      throw new Error('Price must be positive');
    }

    if (createMembershipDto.name === '' || createMembershipDto.name === null) {
      throw new Error('Name must not be empty');
    }

    if (createMembershipDto.memberId < 0) {
      throw new Error('Member id must be positive');
    }

    if (createMembershipDto.features === null) {
      throw new Error('Features must not be empty');
    }

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
