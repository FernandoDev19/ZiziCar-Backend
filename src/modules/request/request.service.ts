import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HashingService } from 'src/common/services/hashing/hashing.service';
import { CustomerService } from '../customer/customer.service';
import { UserService } from '../user/user.service';
import { MetaService } from 'src/common/services/meta/meta.service';

@Injectable()
export class RequestService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
    private customerService: CustomerService,
    private userService: UserService,
    private metaService: MetaService
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    let customerId: string = '';
    const userExist = await this.prismaService.users.findFirst({
      where: {
        OR: [
          { phone: createRequestDto.phone },
          { email: createRequestDto.email },
        ],
      },
    });
    

    const customer: CreateCustomerDto = {
      name: createRequestDto.name,
    };

    if (!userExist) {
      const customerCreated = await this.customerService.create(customer);

      const user: CreateUserDto = {
        username: createRequestDto.name,
        email: createRequestDto.email,
        phone: createRequestDto.phone,
        password: await this.hashingService.hashPassword(
          createRequestDto.phone,
        ),
        role_id: 4,
        customer_id: customerCreated.id,
      };

      await this.userService.create(user);

      customerId = customerCreated.id;
    }else{
      if(userExist.customer_id){
        customerId = userExist.customer_id;
      }else{
        const customerCreated = await this.customerService.create(customer);

        customerId = customerCreated.id;
      }
    }

    const requestToCreate = await this.prismaService.requests.create({
      data: {
        customer_id: customerId,
        comments: createRequestDto.comments || 'No hay comentarios',
        entry_city_id: createRequestDto.entry_city_id,
        receive_at_airport: createRequestDto.receive_at_airport,
        entry_date: createRequestDto.entry_date,
        entry_time: createRequestDto.entry_time,
        devolution_city_id: createRequestDto.devolution_city_id,
        returns_at_airport: createRequestDto.returns_at_airport,
        devolution_date: createRequestDto.devolution_date,
        devolution_time: createRequestDto.devolution_time,
        gamma_id: createRequestDto.gamma_id,
        transmission_id: createRequestDto.transmission_id
      },
    });

    this.sendWhatsappMessages(createRequestDto);

    return requestToCreate;
  }

  async sendWhatsappMessages(dataRequest: CreateRequestDto){
    try{
      await this.metaService.sendRequestConfirmationTemplate(dataRequest.phone, dataRequest.name);
    }catch(e){

    }
  }
}
