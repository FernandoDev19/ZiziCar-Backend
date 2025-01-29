import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class NewService {
    constructor(private prismaService: PrismaService){}

    async findAllActive(){
        const news = await this.prismaService.news.findMany({
            where: {
                status: true
            }
        });

        return news;
    }
}
