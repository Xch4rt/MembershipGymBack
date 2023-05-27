import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailValidator } from '../utils/emailValidator';
@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailValidator: EmailValidator
  ) {}

  private readonly logger = new Logger(MembersService.name);

  async create(createMemberDto: CreateMemberDto) {

    if (!this.emailValidator.isValid(createMemberDto.email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
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

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
