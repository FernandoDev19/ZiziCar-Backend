import { Module } from '@nestjs/common';
import { GammaService } from './gamma.service';
import { GammaController } from './gamma.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [GammaController],
  providers: [GammaService],
  imports: [PrismaModule]
})
export class GammaModule {}
