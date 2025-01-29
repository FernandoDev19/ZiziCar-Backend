import { Controller, Get } from '@nestjs/common';
import { TransmissionService } from './transmission.service';

@Controller('transmission')
export class TransmissionController {
  constructor(private readonly transmissionService: TransmissionService) {}

  @Get()
  findAll(){
    return this.transmissionService.findAll();
  }
}
