import { Controller, Get } from '@nestjs/common';
import { GammaService } from './gamma.service';

@Controller('gamma')
export class GammaController {
  constructor(private readonly gammaService: GammaService) {}

  @Get()
  findAll(){
    return this.gammaService.findAll();
  }
}
