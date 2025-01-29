import { Controller, Get } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  findAllCities(){
    return this.geolocationService.findAllCities();
  }
}
