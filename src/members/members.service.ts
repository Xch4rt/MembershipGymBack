import { HttpException, HttpStatus, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailValidator } from '../utils/emailValidator';
import { PaginationDto } from './dto/pagination.dto';
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
    const {page, limit} = paginationDto;
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

  update(id: number, updateMemberDto: UpdateMemberDto) {

  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
