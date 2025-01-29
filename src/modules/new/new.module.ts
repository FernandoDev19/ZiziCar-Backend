import { Module } from '@nestjs/common';
import { NewService } from './new.service';
import { NewController } from './new.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  controllers: [NewController],
  providers: [NewService],
  imports: [PrismaModule]
})
export class NewModule {}
