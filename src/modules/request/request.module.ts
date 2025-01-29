import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { HashingService } from 'src/common/services/hashing/hashing.service';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';
import { MetaService } from 'src/common/services/meta/meta.service';

@Module({
  controllers: [RequestController],
  providers: [RequestService, HashingService, MetaService],
  imports: [PrismaModule, CustomerModule, UserModule]
})
export class RequestModule {}
