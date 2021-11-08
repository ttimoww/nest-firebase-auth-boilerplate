import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Auth } from './auth/auth.decorator';
import { Role } from './user/role.enum';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

  @Get()
    getHello(): string {
        return this.appService.getHello();
    }

  @Auth([Role.user])
  @Get('/secret')
  getTest(): string {
      return this.appService.getProtectedHello();
  }
}
