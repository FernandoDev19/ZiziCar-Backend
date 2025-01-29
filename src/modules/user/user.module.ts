import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { HashingService } from 'src/common/services/hashing/hashing.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashingService],
  imports: [PrismaModule],
  exports: [UserService]
})
export class UserModule {}
