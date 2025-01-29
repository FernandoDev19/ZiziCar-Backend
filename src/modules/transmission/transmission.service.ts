import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TransmissionService {
    constructor(private prismaService: PrismaService){}

    async findAll(){
        const transmissions = await this.prismaService.transmissions.findMany();

        if(!transmissions || transmissions.length === 0){
            throw new NotFoundException('Transmissions not found');
        }

        return transmissions;
    }
}
