import { Module } from '@nestjs/common';
import { TransmissionService } from './transmission.service';
import { TransmissionController } from './transmission.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [TransmissionController],
  providers: [TransmissionService],
  imports: [PrismaModule]
})
export class TransmissionModule {}
