import { Controller, Get } from '@nestjs/common';
import { NewService } from './new.service';

@Controller('new')
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Get('active')
  finAllActive(){
     return this.newService.findAllActive();
  }
}
