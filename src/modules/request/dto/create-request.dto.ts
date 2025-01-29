import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRequestDto {
    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(150)
    name: string;
    
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(20)
    phone: string;

    @IsNumber()
    entry_city_id: number;

    @IsBoolean()
    receive_at_airport: boolean;

    @IsNumber()
    devolution_city_id: number;

    @IsBoolean()
    returns_at_airport: boolean;

    @IsNotEmpty()
    entry_date: Date;

    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(20)
    entry_time: string;

    @IsNotEmpty()
    devolution_date: Date;

    @IsString()
    @Transform(({value}) => value.trim())
    @IsNotEmpty()
    @MaxLength(20)
    devolution_time: string;

    @IsNumber()
    gamma_id: number;

    @IsNumber()
    transmission_id: number;

    @IsOptional()
    @IsString()
    @MaxLength(180)
    comments?: string;
}
