import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { MyDto } from './dtos/my-dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'say hello',
  })
  @Get()
  getHello(@Body() dto?: MyDto): string {
    return this.appService.getHello(dto?.someEnum);
  }
}
