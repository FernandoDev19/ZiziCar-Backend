import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [GeolocationController],
  providers: [GeolocationService],
  imports: [PrismaModule]
})
export class GeolocationModule {}
