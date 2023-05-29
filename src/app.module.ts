import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MembersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ValidationPipe],
})
export class AppModule {}
