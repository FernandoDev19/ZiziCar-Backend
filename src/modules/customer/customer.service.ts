import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdatedCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(private prismaService: PrismaService){}

    async create(createCustomerDto: CreateCustomerDto){
        const customerToCreate = await this.prismaService.customers.create({
            data: createCustomerDto
        });

        return customerToCreate;
    }

    async update(id: string, updatedCustomerDto: UpdatedCustomerDto){
        const customerToUpdate = await this.prismaService.customers.update({
            where: {
                id
            },
            data: updatedCustomerDto
        });

        return customerToUpdate;
    }
}
