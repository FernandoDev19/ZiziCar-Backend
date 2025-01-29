import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [PrismaModule]
})
export class ProviderModule {}
