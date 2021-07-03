import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Public()
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
