import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailValidator } from '../utils/emailValidator';

@Module({
  controllers: [MembersController],
  providers: [MembersService, EmailValidator],
  imports: [
    PrismaModule,
    
    ],
})
export class MembersModule {}
