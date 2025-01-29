import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class GeolocationService {
    constructor(private prismaService: PrismaService){}

    async findAllCities() {
        const cities = await this.prismaService.cities.findMany({
            include: {
                states: {
                    include: {
                        countries: {
                            include: {
                                continents: true
                            }
                        }
                    }
                }
            }
        });
    
        if (!cities || cities.length === 0) {
            throw new NotFoundException('Cities not found');
        }
    
        const geolocation = cities.reduce((acc, city) => {
            const { id: city_id, name: city_name, states } = city;
            const { id: state_id, name: state_name, countries } = states;
            const { id: country_id, name: country_name, continents, prefix } = countries;
            const { id: continent_id, name: continent_name } = continents;
    
            // Encontrar o crear el continente
            let continent = acc.find(c => c.continent_id === continent_id);
            if (!continent) {
                continent = {
                    continent_id,
                    continent_name,
                    countries: []
                };
                acc.push(continent);
            }
    
            // Encontrar o crear el país
            let country = continent.countries.find(c => c.country_id === country_id);
            if (!country) {
                country = {
                    country_id,
                    country_name,
                    prefix,
                    states: []
                };
                continent.countries.push(country);
            }
    
            // Encontrar o crear el estado
            let state = country.states.find(s => s.state_id === state_id);
            if (!state) {
                state = {
                    state_id,
                    state_name,
                    cities: []
                };
                country.states.push(state);
            }
    
            // Agregar la ciudad
            state.cities.push({
                city_id,
                city_name
            });
    
            return acc;
        }, [] as {
            continent_id: number;
            continent_name: string;
            countries: {
                country_id: number;
                country_name: string;
                prefix: number;
                states: {
                    state_id: number;
                    state_name: string;
                    cities: {
                        city_id: number;
                        city_name: string;
                    }[];
                }[];
            }[];
        }[]);
    
        return geolocation;
    }
       
}
