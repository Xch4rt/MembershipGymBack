import { Test, TestingModule } from '@nestjs/testing';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailValidator } from 'src/utils/emailValidator';

describe('MembershipController', () => {
  let controller: MembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipController],
      providers: [MembershipService, PrismaService, EmailValidator],
    }).compile();

    controller = module.get<MembershipController>(MembershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
