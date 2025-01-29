import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  create(@Body() provider: CreateProviderDto){
    return this.providerService.create(provider);
  }

  @Get()
  findAll(){
    return this.providerService.findAll();
  }
}
