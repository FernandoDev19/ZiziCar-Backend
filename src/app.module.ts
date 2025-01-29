import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProviderModule } from './modules/provider/provider.module';
import { CustomerModule } from './modules/customer/customer.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { GammaModule } from './modules/gamma/gamma.module';
import { TransmissionModule } from './modules/transmission/transmission.module';
import { GeolocationModule } from './modules/geolocation/geolocation.module';
import { RequestModule } from './modules/request/request.module';
import { NewModule } from './modules/new/new.module';
import { MetaService } from './common/services/meta/meta.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MetaQueueService } from './common/services/queues/meta-queue/meta-queue/meta-queue.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    BullModule.registerQueue({
      name: 'meta-queue'
    }),
    UserModule, ProviderModule, CustomerModule, EmployeeModule, GammaModule, TransmissionModule, GeolocationModule, RequestModule, NewModule],
  controllers: [],
  providers: [MetaService, ConfigService, MetaQueueService],
})
export class AppModule {}
