import { HttpException, HttpStatus, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailValidator } from '../utils/emailValidator';
import { PaginationDto } from './dto/pagination.dto';
import { Member } from './entities/member.entity';
@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailValidator: EmailValidator
  ) { }

  private readonly logger = new Logger(MembersService.name);

  async create(createMemberDto: CreateMemberDto) {

    if (!this.emailValidator.isValid(createMemberDto.email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    if (createMemberDto.phone.length !== 8) {
      throw new HttpException('Invalid phone', HttpStatus.BAD_REQUEST);
    }

    if (createMemberDto.name == null || createMemberDto.lastName == null || createMemberDto.address == null || createMemberDto.phone == null) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }

    try {
      const member = await this.prisma.member.create({
        data: createMemberDto
      });
      return member;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page=1, limit=10 } = paginationDto;
    const skip: number = (page - 1) * limit;

    const total = await this.prisma.member.count();

    const data = await this.prisma.member.findMany({
      skip,
      take: limit
    });

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / limit)
      }
    };
  }

  async findOne(value: string) {
    const member = await this.prisma.member.findMany({
      where: {
        OR: [
          {
            email: value
          },
          {
            phone: value
          },
          {
            address: value
          },
          {
            name: value
          },
          {
            lastName: value
          }
        ]
      }
    });

    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {

    if (!this.emailValidator.isValid(updateMemberDto.email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    if (updateMemberDto.phone.length !== 8) {
      throw new HttpException('Invalid phone', HttpStatus.BAD_REQUEST);
    }

    if (updateMemberDto.name == null || updateMemberDto.lastName == null || updateMemberDto.address == null || updateMemberDto.phone == null) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }

    const member = await this.prisma.member.findUnique({
      where: {
        id: id
      }
    });
    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.member.update({
      where: {
        id: id
      },
      data: updateMemberDto
    });

    return member;
  }

  async remove(id: number) {
    const member = await this.prisma.member.findUnique({
      where: {
        id: id
      }
    });
    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.member.update({
      where: {
        id: id
      },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });

    if (!member) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    return member;
  }
}
