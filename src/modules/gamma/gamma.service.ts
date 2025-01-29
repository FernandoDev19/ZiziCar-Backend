import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class GammaService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const gammas = await this.prismaService.gammas.findMany();

    if (!gammas || gammas.length === 0) {
      throw new NotFoundException('Gammas not found');
    }

    const averagePriceByGamma = await this.getAveragePriceByGamma();
    const gammasWithAveragePrice = gammas.map((gamma) => {
      const gammaPrice = averagePriceByGamma.find(
        (price) => price.gammaId === gamma.id,
      );
      return {
        ...gamma,
        average_price: gammaPrice ? gammaPrice.averagePrice : 0,
      };
    });

    return gammasWithAveragePrice;
  }

  private async getAveragePriceByGamma() {
    const quotes = await this.prismaService.answers.findMany({
      where: {
        answer_type: 'quote',
      },
      include: {
        requests: true,
        quotes: true,
      },
      orderBy: [
        { requests: { gamma_id: 'asc' } },
        { requests: { entry_date: 'desc' } },
      ],
      take: 100,
    });

    if (!quotes || quotes.length === 0) {
      return [];
    }

    const gammaMap = new Map<number, any[]>();

    quotes.forEach((quote) => {
      const request = quote.requests;
      if (request && request.gamma_id) {
        if (!gammaMap.has(request.gamma_id)) {
          gammaMap.set(request.gamma_id, []);
        }
        const gammaQuotes = gammaMap.get(request.gamma_id);

        if (gammaQuotes && gammaQuotes.length < 10) {
          gammaQuotes.push({
            rent: quote.quotes.rental_price,
            entry_date: request.entry_date,
            devolution_date: request.devolution_date,
          });
        }
      }
    });

    const preciosPromedio = Array.from(gammaMap.entries()).map(
      ([gammaId, gammaQuotes]) => {
        const totalDailyValues = gammaQuotes.reduce(
          (acc, quote) => {
            const diasDeRenta = this.getDaysOfRent(
              quote.entry_date,
              quote.devolution_date,
            );
            if (diasDeRenta > 0) {
              const dailyPrice = quote.rent / diasDeRenta;
              acc.total += dailyPrice;
              acc.count += 1;
            }
            return acc;
          },
          { total: 0, count: 0 },
        );

        const averageDailyPrice =
          totalDailyValues.count > 0
            ? totalDailyValues.total / totalDailyValues.count
            : 0;

        return {
          gammaId,
          averagePrice: averageDailyPrice,
        };
      },
    );

    return preciosPromedio;
  }

  private getDaysOfRent(entryDate: string, devolutionDate: string) {
    const startDate = new Date(entryDate);
    const endDate = new Date(devolutionDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.ceil(differenceInDays);
  }
}
