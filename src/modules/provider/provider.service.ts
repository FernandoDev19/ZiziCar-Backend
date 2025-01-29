import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProviderService {
    constructor(private prismaService: PrismaService){}

    async create(provider: CreateProviderDto){
        const providerExist = await this.prismaService.providers.findFirst({
            where: {
                nit: provider.nit,
                company_name: provider.company_name
            }
        });

        if(providerExist){
            throw new ConflictException('NIT or company name is already in use.');
        }

        return await this.prismaService.providers.create({
            data: provider
        });
    }

    async findAll(){
        const providers = await this.prismaService.providers.findMany();

        if(!providers || providers.length === 0){
            throw new NotFoundException('Providers not found');
        }

        return providers;
    }
}
