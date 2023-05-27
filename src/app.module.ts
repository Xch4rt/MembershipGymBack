import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';

@Module({
  imports: [MembersModule],
  controllers: [AppController],
  providers: [AppService, ValidationPipe],
})
export class AppModule {}
