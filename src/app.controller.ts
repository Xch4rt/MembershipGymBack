import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('helloWorld')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('api')
  getHello(): string {
    return this.appService.getHello();
  }
}
